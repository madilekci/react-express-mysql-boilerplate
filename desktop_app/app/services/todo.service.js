import db from '../models/index.js';
import { BadRequestError, NotFoundError } from '../common/errors.js';

const Todo = db.todo;

export default class TodoService {
    static async create({ title, description }) {
        if (!title || title.trim() === '') {
            throw new BadRequestError(
                'Title is required when creating a todo item'
            );
        }

        // Create new todo item
        try {
            const todo = await Todo.create({ title, description });
            return todo;
        }
        catch (error) {
            throw new Error(`Failed to create todo: ${error.message}`);
        }
    }

    static async find(sort, filter) {
        const options = {};

        // Add filtering logic
        if (filter) {
            // Assuming `filter` is an object { key: value }
            options.where = filter;
        }

        // Add sorting logic
        if (sort) {
            // Sort should be { field: 'ASC'/'DESC' }
            options.order = [Object.entries(sort)[0]];
        }

        try {
            const todos = await Todo.findAll(options);
            return todos;
        }
        catch (error) {
            throw new Error(`Failed to retrieve todos: ${error.message}`);
        }
    }

    static async update(todoId, data) {
        try {
            // Check if todo item exists
            const todo = await Todo.findByPk(todoId);
            if (!todo) {
                throw new NotFoundError('Todo item not found');
            }

            // Update todo item
            await todo.update(data);
            return todo;
        }
        catch (error) {
            throw new Error(`Failed to update todo: ${error.message}`);
        }
    }

    static async delete(todoId) {
        try {
            // Check if todo item exists
            const todo = await Todo.findByPk(todoId);
            if (!todo) {
                throw new NotFoundError('Todo item not found');
            }

            // Delete todo item
            await todo.destroy();
            return todo;
        }
        catch (error) {
            throw new Error(`Failed to delete todo: ${error.message}`);
        }
    }
}
