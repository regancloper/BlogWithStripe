import * as express from 'express';

import DB from '../../db';

const router = express.Router();


router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    try {
        let user = await DB.Users.findOneById(id);
        res.json(user);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


export default router;