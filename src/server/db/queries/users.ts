import { Query } from "../index";

const findOneByEmail = async (email: string) => Query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);

const findOneById = async (id: number) => Query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);

const insert = async (user: any) => Query('INSERT INTO users(firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)', [user.firstname, user.lastname, user.email, user.password, user.role]);

export default {
    findOneByEmail,
    findOneById,
    insert
}