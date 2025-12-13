import { Router } from 'express';

import { router as openTheBoxRouter } from './open-the-box/router';
import { QuizController } from './quiz/quiz.controller';

export const gameListRouter = Router();

gameListRouter.use('/quiz', QuizController);
gameListRouter.use('/open-the-box', openTheBoxRouter);
