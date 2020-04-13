import { Query } from "../index";

const getAll = async () => Query('SELECT id, name from tags');

const getTag = async (id: number) => Query('SELECT t.name FROM blogtags b JOIN tags t ON b.tagid = t.id WHERE b.blogid = ?', [id]);

const postTag = async (blogid: number, tag: string) => Query('SELECT id FROM Tags WHERE name = ?', [tag])
    .then((result) => Query('INSERT INTO blogtags(blogid, tagid) VALUES (?, ?)', [blogid, result[0].id]))
    .catch(error => console.log(error));


export default {
    getAll,
    getTag,
    postTag
}