'use client';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

export default function Home() {
	const [taskText, setTaskText] = useState('');
	const [tasks, setTasks] = useState([]);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		setTasks(savedTasks);
	}, []);

	useEffect(() => {
		if (tasks.length > 0) {
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}, [tasks]);

	const handleOnChange = taskText => {
		setTaskText(taskText);
	};

	const handleAddTask = () => {
		if (taskText.trim()) {
			const newTask = {
				id: Date.now(),
				text: taskText,
				completed: false,
			};
			setTasks([...tasks, newTask]);
			setTaskText('');
		}
	};

	const handleToggleTask = id => {
		const updatedTasks = tasks.map(task => {
			return task.id === id ? { ...task, completed: !task.completed } : task;
		});
		setTasks(updatedTasks);
	};

	const handleDeleteTask = id => {
		const updatedTasks = tasks.filter(task => id !== task.id);
		setTasks(updatedTasks);
	};

	const handleChangeFilter = filter => {
		setFilter(filter);
	};

	const inCompleteTaskCount = tasks.filter(task => !task.completed).length;

	return (
		<div className='container mx-auto p-4'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-4xl font-bold'>TODO</h1>
			</div>
			<div className='mb-4 flex items-center'>
				<input
					type='text'
					className='bg-gray-800 text-white border-none rounded p-4 flex-grow'
					placeholder='What to do ?'
					onChange={event => {
						handleOnChange(event.target.value);
					}}
					value={taskText}
				/>
				<button
					onClick={handleAddTask}
					className='bg-blue-500 text-white p-4 rounded ml-4'
				>
					Add Task
				</button>
			</div>
			<div className='bg-gray-800 rounded p-4'>
				<TaskList
					tasks={tasks}
					filter={filter}
					handleToggleTask={handleToggleTask}
					handleDeleteTask={handleDeleteTask}
				/>
				<div className='mt-4 flex justify-between items-center text-sm text-gray-400'>
					<span> {inCompleteTaskCount} items left</span>
					<div>
						<button
							onClick={() => handleChangeFilter('all')}
							className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}
						>
							All
						</button>
						<button
							onClick={() => handleChangeFilter('active')}
							className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}
						>
							Active
						</button>
						<button
							onClick={() => handleChangeFilter('completed')}
							className={`${filter === 'completed' ? 'text-white' : ''}`}
						>
							Completed
						</button>
					</div>
					<button
						onClick={() => setTasks(tasks.filter(task => !task.completed))}
						className='text-gray-400 hover:text-white'
					>
						Clear Completed
					</button>
				</div>
			</div>
		</div>
	);
}
