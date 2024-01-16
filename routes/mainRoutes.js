import express from 'express';
import * as controller from '../controllers/mainController.js';

const router = express.Router();

// Define routes

router.get('/', controller.loadCRUD);
router.post('/create', controller.createPlayer);
router.get('/edit/:id', controller.editPlayer);
router.get('/score/:id', controller.score);
router.post('/update/:id', controller.updatePlayer);
router.get('/delete/:id', controller.deletePlayer);
router.get('/sorting/:sortType', controller.sort);

export default router;
