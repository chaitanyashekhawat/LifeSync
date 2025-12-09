import React, { useState, useEffect } from 'react';
import API from '../services/api';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTasks = async () => {
        try {
            let query = `?page=${page}&limit=5&search=${search}`;
            if (filter !== 'all') {
                query += `&isCompleted=${filter === 'completed'}`;
            }
            const { data } = await API.get(`/tasks${query}`);
            setTasks(data.tasks);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, search, filter]);

    const addTask = async (e) => {
        e.preventDefault();
        try {
            await API.post('/tasks', { title });
            setTitle('');
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleTask = async (id, isCompleted) => {
        try {
            await API.put(`/tasks/${id}`, { isCompleted: !isCompleted });
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>

            <div className="task-controls">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            <form onSubmit={addTask} className="add-task-form">
                <input
                    type="text"
                    placeholder="New Task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>

            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className={task.isCompleted ? 'completed' : ''}>
                        <div className="task-item-left">
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => toggleTask(task.id, task.isCompleted)}
                            />
                            <span>{task.title}</span>
                        </div>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default Dashboard;
