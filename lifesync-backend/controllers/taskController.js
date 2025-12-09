const prisma = require('../prisma/client');

const getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, sort, isCompleted } = req.query;
        const skip = (page - 1) * limit;

        const where = { userId: req.user.id };

        if (search) {
            where.title = { contains: search, mode: 'insensitive' };
        }

        if (isCompleted !== undefined) {
            where.isCompleted = isCompleted === 'true';
        }

        const orderBy = sort ? { [sort]: 'asc' } : { createdAt: 'desc' };

        const [tasks, count] = await Promise.all([
            prisma.task.findMany({
                where,
                orderBy,
                skip: parseInt(skip),
                take: parseInt(limit),
            }),
            prisma.task.count({ where })
        ]);

        res.json({
            tasks,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId: req.user.id,
            }
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await prisma.task.findUnique({
            where: { id: req.params.id }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedTask = await prisma.task.update({
            where: { id: req.params.id },
            data: req.body
        });

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await prisma.task.findUnique({
            where: { id: req.params.id }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await prisma.task.delete({
            where: { id: req.params.id }
        });

        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
