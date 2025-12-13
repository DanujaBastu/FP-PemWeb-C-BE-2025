import { Router } from 'express';

import { AnagramController } from './anagram/anagram.controller';
import { router as openTheBoxRouter } from './open-the-box/router';
import { PairOrNoPairController } from './pair-or-no-pair/pair-or-no-pair.controller';
import { QuizController } from './quiz/quiz.controller';
import { SpeedSortingController } from './speed-sorting/speed-sorting.controller';

export const gameListRouter = Router();

gameListRouter.use('/anagram', AnagramController);
gameListRouter.use('/pair-or-no-pair', PairOrNoPairController);
gameListRouter.use('/quiz', QuizController);
gameListRouter.use('/speed-sorting', SpeedSortingController);
gameListRouter.use('/open-the-box', openTheBoxRouter);
