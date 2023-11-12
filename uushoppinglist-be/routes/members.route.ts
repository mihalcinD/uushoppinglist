import { Router } from 'express';

const router = Router({ mergeParams: true });

router.post('/');
router.delete('/:id');

export default router;
