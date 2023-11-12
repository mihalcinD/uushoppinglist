import { Router } from 'express';
import { createList, deleteList, getList, getLists, patchList } from '../controllers/lists.controller';
import { restrict } from '../middlewares/authorization';
import { Profiles } from '../types/enums/profiles';

const router = Router();

router.get('/', getLists);
router.get('/:listID', restrict([Profiles.OWNER, Profiles.MEMBER]), getList);
router.post('/', createList);
router.patch('/:listID', restrict([Profiles.OWNER]), patchList);
router.delete('/:listID', restrict([Profiles.OWNER]), deleteList);
export default router;
