import { Router } from 'express';
import { createList, getList, getLists, patchList } from '../controllers/lists.controller';

const router = Router();

router.get('/', getLists);
router.get('/:id', getList);
router.post('/', createList);
router.patch('/:id', patchList);
router.delete('/:id');

export default router;
