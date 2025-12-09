const prisma = require('../prisma/client');

const getGoals = async (req, res) => {
    try {
        const goals = await prisma.goal.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' }
        });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createGoal = async (req, res) => {
    try {
        const { title, description, targetDate } = req.body;
        const goal = await prisma.goal.create({
            data: {
                title,
                description,
                targetDate: targetDate ? new Date(targetDate) : null,
                userId: req.user.id,
            }
        });
        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGoal = async (req, res) => {
    try {
        const goal = await prisma.goal.findUnique({
            where: { id: req.params.id }
        });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedGoal = await prisma.goal.update({
            where: { id: req.params.id },
            data: req.body
        });

        res.json(updatedGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGoal = async (req, res) => {
    try {
        const goal = await prisma.goal.findUnique({
            where: { id: req.params.id }
        });

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.userId !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await prisma.goal.delete({
            where: { id: req.params.id }
        });

        res.json({ message: 'Goal removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
