import React, { useState, useEffect } from 'react';
import API from '../services/api';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [title, setTitle] = useState('');
    const [targetDate, setTargetDate] = useState('');

    const fetchGoals = async () => {
        try {
            const { data } = await API.get('/goals');
            setGoals(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const addGoal = async (e) => {
        e.preventDefault();
        try {
            await API.post('/goals', { title, targetDate });
            setTitle('');
            setTargetDate('');
            fetchGoals();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteGoal = async (id) => {
        try {
            await API.delete(`/goals/${id}`);
            fetchGoals();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="goals-container">
            <h2>Goals</h2>
            <form onSubmit={addGoal} className="add-goal-form">
                <input
                    type="text"
                    placeholder="New Goal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                />
                <button type="submit">Add Goal</button>
            </form>

            <div className="goals-list">
                {goals.map((goal) => (
                    <div key={goal.id} className="goal-card">
                        <h3>{goal.title}</h3>
                        <p>Target: {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString() : 'No date'}</p>
                        <button onClick={() => deleteGoal(goal.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Goals;
