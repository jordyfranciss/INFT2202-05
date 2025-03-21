import express from 'express';
import animalControllers from '../controllers/animal.js'; // Make sure this is correct
import { checkValidation } from '../middleWare/validation.js';

const router = express.Router();

router.get('/:name?', checkValidation(animalControllers.rules), animalControllers.index);
router.post('/', checkValidation(animalControllers.rules), animalControllers.add);
router.delete('/:name?', animalControllers.delete);
router.put('/', checkValidation(animalControllers.rules), animalControllers.update);

export default router;
