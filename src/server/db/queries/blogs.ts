import { Query } from "../index";

const getAll = async () => Query('SELECT b.*, u.firstname, u.lastname FROM blogs b JOIN users u ON b.authorid = u.id');

const getSingleBlog = async (id: number) => Query('SELECT b.*, u.firstname, u.lastname FROM blogs b JOIN users u ON b.authorid = u.id WHERE b.id = ?', [id]);

const postBlog = async (title: string, content: string, authorid: number) => Query('INSERT INTO blogs(title, content, authorid) VALUES (?, ?, ?)', [title, content, authorid]);

const editBlog = async (title: string, content: string, id: number) => Query('UPDATE blogs SET title = ?, content = ? WHERE id =?', [title, content, id]);

const deleteBlog = async (id: number) => Query('DELETE FROM blogs WHERE id = ?', [id]);

export default {
    getAll,
    getSingleBlog,
    postBlog,
    editBlog,
    deleteBlog
}