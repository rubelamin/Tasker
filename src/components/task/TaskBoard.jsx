import { useState } from "react";

import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
	const defaultTask = {
		id: crypto.randomUUID(),
		title: "Learn React",
		description: "Learn React from Learn With Sumit",
		tags: ["react", "python", "web"],
		priority: "High",
		isFavorite: false,
	};
	const [tasks, setTasks] = useState([defaultTask]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [taskToUpdate, setTaskToUpdate] = useState(null);

	function handleAddEditTask(e, newTask, isAdd) {
		e.preventDefault();
		if (isAdd) {
			setTasks([...tasks, newTask]);
		} else {
			setTasks(
				tasks.map((task) => {
					if (task.id === newTask.id) {
						return newTask;
					}
					return task;
				})
			);
		}
		setShowAddModal(false);
	}

	function handleCloseClick() {
		setShowAddModal(false);
		setTaskToUpdate(null);
	}

	function handleEditTask(task) {
		setTaskToUpdate(task);
		setShowAddModal(true);
	}

	function handleDeleteTask(taskId) {
		const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
		setTasks(tasksAfterDelete);
	}

	function handleDeleteAllClick() {
		tasks.length = 0;
		setTasks([...tasks]);
	}

	function handleFavorite(taskId) {
		// const taskIndex = tasks.findIndex((task) => task.id === taskId);

		// const newTasks = [...tasks];
		// newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;

		// setTasks(newTasks);

		// below the better way of deep cloning

		setTasks(
			tasks.map((task) => {
				if (task.id === taskId) {
					return { ...task, isFavorite: !task.isFavorite };
				} else {
					return task;
				}
			})
		);
	}

	function handleSearch(searchTerm) {
		const filteredTasks = tasks.filter((task) =>
			task.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		console.log(filteredTasks);

		setTasks([...filteredTasks]);
	}

	return (
		<section className="mb-20" id="tasks">
			{showAddModal && (
				<AddTaskModal
					onSave={handleAddEditTask}
					onCloseClick={handleCloseClick}
					taskToUpdate={taskToUpdate}
				/>
			)}
			<div className="container">
				<div className="p-2 flex justify-end">
					<SearchTask onSearch={handleSearch} />
				</div>

				<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
					<TaskActions
						onAddTask={() => setShowAddModal(true)}
						onDeleteAllClick={handleDeleteAllClick}
					/>

					{tasks.length > 0 ? (
						<TaskList
							tasks={tasks}
							onEdit={handleEditTask}
							onDelete={handleDeleteTask}
							onFav={handleFavorite}
						/>
					) : (
						<NoTasksFound />
					)}
				</div>
			</div>
		</section>
	);
}
