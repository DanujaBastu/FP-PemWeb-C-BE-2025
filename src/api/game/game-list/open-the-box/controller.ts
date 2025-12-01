import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  type AuthedRequest,
  ErrorResponse,
  prisma,
  SuccessResponse,
} from '@/common';

import { type CreateOpenTheBoxProps } from './schema';

export const createOpenTheBox = async (
  // Ganti {} dengan unknown atau Record<string, unknown> agar linter tidak marah
  request: AuthedRequest<unknown, unknown, CreateOpenTheBoxProps>,
  response: Response,
  next: NextFunction,
) => {
  try {
    // Rename thumbnail_image menjadi thumbnailImage saat destructuring
    const {
      name,
      description,
      thumbnail_image: thumbnailImage,
      gameData,
    } = request.body;
    const userId = request.user!.user_id;

    const template = await prisma.gameTemplates.findUnique({
      where: { slug: 'open-the-box' },
    });

    if (!template) {
      throw new ErrorResponse(
        StatusCodes.NOT_FOUND,
        'Template Open the Box not found',
      );
    }

    const newGame = await prisma.games.create({
      data: {
        name,
        description,
        thumbnail_image: thumbnailImage || '',
        creator_id: userId,
        game_template_id: template.id,
        is_published: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
        game_json: gameData as any,
      },
    });

    const result = new SuccessResponse(
      StatusCodes.CREATED,
      'Open the Box game created successfully',
      newGame,
    );

    return response.status(result.statusCode).json(result.json());
  } catch (error) {
    return next(error);
  }
};

export const getOpenTheBoxDetail = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;

    const game = await prisma.games.findUnique({
      where: { id },
      include: {
        creator: {
          select: { username: true, id: true },
        },
        game_template: true,
      },
    });

    if (!game) {
      throw new ErrorResponse(StatusCodes.NOT_FOUND, 'Game not found');
    }

    const result = new SuccessResponse(
      StatusCodes.OK,
      'Get game detail successfully',
      game,
    );

    return response.status(result.statusCode).json(result.json());
  } catch (error) {
    return next(error);
  }
};
