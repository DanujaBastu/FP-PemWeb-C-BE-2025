/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-default-export */
import { Router } from 'express';

import { AuthController } from './auth/auth.controller';
import { GameController } from './game/game.controller';
// 1. IMPORT ROUTER OPEN THE BOX KITA
import { router as openTheBoxRouter } from './game/game-list/open-the-box/router';
import { UserController } from './user/user.controller';

const AppRouter = Router();

AppRouter.use('/auth', AuthController);
AppRouter.use('/user', UserController);

// 2. DAFTARKAN JALUR OPEN THE BOX (Taruh SEBELUM '/game' agar lebih prioritas)
// URL Hasilnya: localhost:4000/api/game/game-list/open-the-box/...
AppRouter.use('/game/game-list/open-the-box', openTheBoxRouter);

// Router game bawaan (tetap biarkan)
AppRouter.use('/game', GameController);

export default AppRouter;
