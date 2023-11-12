import { Router } from 'express';
import { createItem, deleteItem, patchItem } from '../controllers/items.controller';

const router = Router({ mergeParams: true });

router.post('/', createItem);
router.patch('/:id', patchItem);
router.delete('/:id', deleteItem);

export default router;
