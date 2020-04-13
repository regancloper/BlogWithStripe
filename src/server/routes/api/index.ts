import * as express from 'express';
import * as passport from 'passport';

import blogsRouter from './blogs';
import tagsRouter from './blogtags';
import usersRouter from './users';

const router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', {session: false}, (err, user, info) => {
        if (user) req.user = user;
        return next();
    })(req, res, next);
});

router.use('/blogs', blogsRouter);
router.use('/blogtags', tagsRouter);
router.use('/users', usersRouter);


export default router;