'use client';
import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({ tasks, filter, handleToggleTask, handleDeleteTask }) => {
	const filteredTasks = tasks.filter(task => {
		if (filter === 'all') return true;
		if (filter === 'active') return !task.completed;
		if (filter === 'completed') return task.completed;
		return true;
	});

	return (
		<>
			<ul>
				{filteredTasks.map(task => {
					return (
						<TaskItem
							task={task}
							handleToggleTask={handleToggleTask}
							handleDeleteTask={handleDeleteTask}
						/>
					);
				})}
			</ul>
		</>
	);
};

export default TaskList;
