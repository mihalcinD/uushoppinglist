import { Router } from 'express';

const router = Router({ mergeParams: true });

router.get('/');
router.get('/:id');
router.post('/');
router.patch('/:id');
router.delete('/:id');

export default router;
