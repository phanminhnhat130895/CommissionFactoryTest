import React, { useEffect, useState } from 'react';
import TaskModal from '../components/tasks/TaskModal';
import { CreateTaskInput } from '../models/createTaskInput';
import { EditTaskInput } from '../models/editTaskInput';
import { TaskViewModel } from '../models/taskViewModel';
import { CompleteTask, CreateTask, DeleteTask, EditTaskDetail, GetListTask } from '../services/task.service';
import './Task.css';

const Task = () => {
    const [tasks, setTasks] = useState<TaskViewModel[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isShow, setIsShow] = useState(false);

    const hideContextMenu = (e: MouseEvent) => {
        let inside = ((e.target as HTMLElement).closest(".menu"));
        if(!inside) {
            setIsShow(false);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await GetListTask();
                setTasks(result);
            }
            catch(err) {
                setErrorMessage("Unexpected error occurred");
            }
        }

        loadData();

        document.addEventListener("click", (e) => hideContextMenu(e))
    }, [])

    const OnCompleteTask = async (id: number) => {
        try {
            const result = await CompleteTask(id);
            if(result.isSuccess) {
                let newTasks = tasks.map(task => {
                    if(task.Id === id) {
                        task.Completed = !task.Completed;
                    }
                    return task;
                })
                setTasks(newTasks);
            }
            else {
                setErrorMessage(result.message);
            }
        }
        catch(err) {
            setErrorMessage("Unexpected error occurred");
        }
    }

    const OnDeleteTask = async (id: number) => {
        setIsShow(false);
        try {
            if(window.confirm("Are you sure that you want to delete this task?")) {
                const result = await DeleteTask(id);
                if(result.isSuccess) {
                    let newTasks = tasks.filter(task => task.Id !== id);
                    setTasks(newTasks);
                }
                else {
                    setErrorMessage(result.message);
                }
            }
        }
        catch(err) {
            setErrorMessage("Unexpected error occurred");
        }
    }

    const OnOpenModal = (id: number) => {
        setSelectedId(id);
        setIsOpenModal(true);
        setIsShow(false);
    }

    const OnCloseModal = () => {
        setSelectedId(0);
        setIsOpenModal(false);
    }

    const OnEditTask = async (details: string) => {
        try {
            const input: EditTaskInput = { Id: selectedId, Details: details };
            const result = await EditTaskDetail(input);
            if(result.isSuccess) {
                let newTasks = tasks.map(task => {
                    if(task.Id === selectedId) {
                        task.Details = details;
                    }
                    return task;
                })
                setTasks(newTasks);
            }
            else {
                setErrorMessage(result.message);
            }
        }
        catch(err) {
            setErrorMessage("Unexpected error occurred");
        }
        finally {
            setIsOpenModal(false);
        }
    }

    const OnCreateTask = async (details: string) => {
        try {
            const input: CreateTaskInput = { Details: details };
            const result = await CreateTask(input);
            if(result) {
                setTasks(prevTasks => [...prevTasks, result]);
            }
            else {
                setErrorMessage(result.message);
            }
        }
        catch(err) {
            setErrorMessage("Unexpected error occurred");
        }
        finally {
            setIsOpenModal(false);
        }
    }

    const OnShowContextMenu = (id: number) => {
        setTimeout(() => {
            setSelectedId(id);
            setIsShow(true);
        }, 0)
    }

    return (
        <div className='task-container'>
            { errorMessage && 
                <div className='error-message'>{errorMessage}</div>
            }
            <div className='page-header'>Tasks</div>
            <div className='table-container'>
                <table className='task-table'>
                    <thead>
                        <tr>
                            <th style={{width: '120px'}} className="text-center border-radius-top-left">COMPLETED</th>
                            <th>DETAILS</th>
                            <th style={{width: '50px'}} className="border-radius-top-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { tasks.map((task, index) => {
                                return (
                                    <tr key={index} className='item'>
                                        <td className='text-center'>
                                            <input className='custom-checkbox' type="checkbox" checked={task.Completed} onChange={() => OnCompleteTask(task.Id)} />
                                        </td>
                                        <td>{task.Details}</td>
                                        <td className='text-center'>
                                            <div className='context-btn' onClick={() => OnShowContextMenu(task.Id)}></div>
                                            { (selectedId === task.Id && isShow) &&
                                                <nav className='menu'>
                                                    <ul>
                                                        <li onClick={() => OnOpenModal(task.Id)}>Edit</li>
                                                        <li onClick={() => OnDeleteTask(task.Id)}>Delete</li>
                                                    </ul>
                                                </nav>
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        <tr>
                            <td colSpan={3} className='border-radius-bottom'>
                                <button className='create-button' onClick={() => OnOpenModal(0)}>+ Create a new task</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            { isOpenModal &&
                <TaskModal id={selectedId} closeModal={OnCloseModal} save={selectedId === 0 ? OnCreateTask : OnEditTask} />
            }
        </div>
    )
}

export default Task;
