import * as express from 'express';
import { RequestHandler, Request } from 'express';

import DB from '../../db';

const router = express.Router();

const isAdmin: RequestHandler = (req: ReqUser, res, next) => {
    if (!req.user || (req.user && req.user.role !== 'admin')) {
        return res.sendStatus(401);
    } else {
        return next();
    }
}

router.get('/', async (req, res, next) => {
    try {
        let blogs = await DB.Blogs.getAll();
        res.json(blogs);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    try {
        let blog = await DB.Blogs.getSingleBlog(id);
        res.json(blog);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', isAdmin, async (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let authorid = req.body.authorid;
    try {
        let result: any = await DB.Blogs.postBlog(title, content, authorid);
        let insertId = result.insertId;
        res.json({ message: 'Blogged!', insertId });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/:id', isAdmin, async (req, res) => {
    let id = parseInt(req.params.id);
    let title = req.body.title;
    let content = req.body.content;
    try {
        await DB.Blogs.editBlog(title, content, id);
        res.json({ message: 'Blogged!'});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.delete('/:id', isAdmin, async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        await DB.Blogs.deleteBlog(id);
        res.json({ message: 'Deleted!'});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

interface ReqUser extends Request {
    user: {
        role: string;
    };
}


export default router;