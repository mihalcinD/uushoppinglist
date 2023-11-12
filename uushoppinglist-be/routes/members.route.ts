import { Router } from 'express';
import { restrict } from '../middlewares/authorization';
import { Profiles } from '../types/enums/profiles';
import { addMember, deleteMember } from '../controllers/members.controller';

const router = Router({ mergeParams: true });

router.post('/', restrict([Profiles.OWNER]), addMember);
router.delete('/:id', restrict([Profiles.OWNER]), deleteMember);

export default router;
