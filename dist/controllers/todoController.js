import Todo from "../models/Todo.js";
export const getTodos = async (req, res) => {
    try {
        const { page = 1, limit = 10, completed, search } = req.query;
        const query = { user: req.user.id };
        if (completed !== undefined) {
            query.completed = completed === "true";
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }
        const skip = (Number(page) - 1) * Number(limit);
        const todos = await Todo.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
        const total = await Todo.countDocuments(query);
        res.json({
            success: true,
            data: {
                todos,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / Number(limit)),
                },
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) {
            res.status(404).json({ success: false, message: "Todo not found" });
            return;
        }
        res.json({
            success: true,
            data: { todo },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({
            title,
            description,
            user: req.user.id,
        });
        await todo.save();
        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: { todo },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export const updateTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const todo = await Todo.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { title, description, completed }, { new: true, runValidators: true });
        if (!todo) {
            res.status(404).json({ success: false, message: "Todo not found" });
            return;
        }
        res.json({
            success: true,
            message: "Todo updated successfully",
            data: { todo },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export const toggleTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
        if (!todo) {
            res.status(404).json({ success: false, message: "Todo not found" });
            return;
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.json({
            success: true,
            message: "Todo status updated successfully",
            data: { todo },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!todo) {
            res.status(404).json({ success: false, message: "Todo not found" });
            return;
        }
        res.json({
            success: true,
            message: "Todo deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};
