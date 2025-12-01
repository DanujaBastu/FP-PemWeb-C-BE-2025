import { Router } from 'express';

import { validateAuth, validateBody } from '@/common';

import { createOpenTheBox, getOpenTheBoxDetail } from './controller';
import { createOpenTheBoxSchema } from './schema';

const openTheBoxRouter = Router();

// POST: Create Game
openTheBoxRouter.post(
  '/',
  validateAuth({}),
  validateBody({ schema: createOpenTheBoxSchema }),
  createOpenTheBox,
);

// GET: Get Game Detail
openTheBoxRouter.get(
  '/:id',
  validateAuth({ optional: true }),
  getOpenTheBoxDetail,
);

export const router = openTheBoxRouter;
