import { Router } from 'express';
import { createItem, deleteItem, patchItem } from '../controllers/items.controller';
import { restrict } from '../middlewares/authorization';
import { Profiles } from '../types/enums/profiles';

const router = Router({ mergeParams: true });

router.post('/', restrict([Profiles.OWNER, Profiles.MEMBER]), createItem);
router.patch('/:id', restrict([Profiles.OWNER, Profiles.MEMBER]), patchItem);
router.delete('/:id', restrict([Profiles.OWNER, Profiles.MEMBER]), deleteItem);

export default router;
