import { Router } from 'express';

import { router as OpenTheBoxRouter } from './open-the-box/router';
import { QuizController } from './quiz/quiz.controller';

const gameListRouter = Router();

gameListRouter.use('/quiz', QuizController);
gameListRouter.use('/open-the-box', OpenTheBoxRouter);

export { gameListRouter };
