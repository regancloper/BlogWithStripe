import * as express from 'express';

import DB from '../../db';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let blogtags = await DB.Blogtags.getAll();
        res.json(blogtags);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    try {
        let blogtag = await DB.Blogtags.getTag(id);
        res.json(blogtag);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    let blogid = req.body.blogid;
    let tag = req.body.tag;
    try {
        res.json(await DB.Blogtags.postTag(blogid, tag));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});




export default router;