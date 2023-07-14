import classNames from 'classnames/bind';
import styles from './TodoApp.module.scss';
import React, { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function TodoApp() {
    const inputRef = useRef();
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState(() => {
        const storageTasks = JSON.parse(localStorage.getItem('tasks'));
        return storageTasks || [];
    });
    const [filterMode, setFilterMode] = useState('all');
    const [activeTab, setActiveTab] = useState('all');

    const handleSubmit = (e) => {
        setTasks((prev) => {
            const newTask = {
                id: Date.now(),
                name: task,
                isCompleted: false,
            };
            const newTasks = [...prev, newTask];

            // Save to local storage
            const jsonTasks = JSON.stringify(newTasks);
            localStorage.setItem('tasks', jsonTasks);
            return newTasks;
        });
        setTask('');
        inputRef.current.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleCheckbox = (task) => {
        setTasks((prev) => {
            const updatedTasks = prev.map((t) => {
                if (t.id === task.id) {
                    return { ...t, isCompleted: !t.isCompleted };
                }
                return t;
            });
            return updatedTasks;
        });
    };

    // không cho gõ kí tự khoảng trắng trong ô input
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ') || searchValue.trim()) {
            setTask(searchValue);
        }
    };

    const handleTaskbar = (mode) => {
        setFilterMode(mode);
        setActiveTab(mode);
    };

    const filteredTasks = tasks
        .filter((task) => task && typeof task === 'object') // Lọc ra các task hợp lệ
        .filter((task) => {
            if (filterMode === 'all') {
                return true;
            } else if (filterMode === 'active') {
                return !task.isCompleted;
            } else if (filterMode === 'completed') {
                return task.isCompleted;
            }
        });

    const isCompletedMode = filterMode === 'completed';

    const deleteTask = (id) => {
        setTasks((prevTasks) => {
            const newTasks = prevTasks.filter((task) => task.id !== id);
            return newTasks;
        });
    };

    const deleteAll = () => {
        const incompleteTasks = tasks.filter((task) => !task.isCompleted);
        setTasks(incompleteTasks);
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>#todo</h1>
            <div>
                <div className={cx('mode')}>
                    <p onClick={() => handleTaskbar('all')}>
                        All
                        <span className={cx({ taskbar: activeTab === 'all' })}></span>
                    </p>
                    <p onClick={() => handleTaskbar('active')}>
                        Active
                        <span className={cx({ taskbar: activeTab === 'active' })}></span>
                    </p>
                    <p onClick={() => handleTaskbar('completed')}>
                        Completed
                        <span className={cx({ taskbar: activeTab === 'completed' })}></span>
                    </p>
                </div>
                <br />
                {!isCompletedMode && (
                    <div className={cx('inputBar')}>
                        <input
                            ref={inputRef}
                            className={cx('taskInput')}
                            placeholder="add details"
                            value={task}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button disabled={!task} className={cx('submit-btn')} onClick={handleSubmit}>
                            Add
                        </button>
                    </div>
                )}
            </div>
            <ul className={cx('taskList')}>
                {filteredTasks?.length > 0 &&
                    filteredTasks.map((task) => (
                        <li className={cx('duties')} key={task.id}>
                            {task && (
                                <>
                                    <input
                                        className={cx('check-btn')}
                                        type="checkbox"
                                        checked={task?.isCompleted || false}
                                        onChange={() => handleCheckbox(task)}
                                    />
                                    <span className={cx('duties', { completed: task?.isCompleted })}>
                                        <p>{task?.name}</p>
                                    </span>
                                </>
                            )}
                            {isCompletedMode && task && (
                                <span
                                    className={cx('icon')}
                                    onClick={() => {
                                        deleteTask(task.id);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_1_75)">
                                            <path
                                                d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V9C18 7.9 17.1 7 16 7H8C6.9 7 6 7.9 6 9V19ZM9 9H15C15.55 9 16 9.45 16 10V18C16 18.55 15.55 19 15 19H9C8.45 19 8 18.55 8 18V10C8 9.45 8.45 9 9 9ZM15.5 4L14.79 3.29C14.61 3.11 14.35 3 14.09 3H9.91C9.65 3 9.39 3.11 9.21 3.29L8.5 4H6C5.45 4 5 4.45 5 5C5 5.55 5.45 6 6 6H18C18.55 6 19 5.55 19 5C19 4.45 18.55 4 18 4H15.5Z"
                                                fill="#BDBDBD"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1_75">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                            )}
                        </li>
                    ))}
            </ul>
            {isCompletedMode && (
                <button
                    className={cx('delBtn')}
                    onClick={() => {
                        deleteAll();
                    }}
                >
                    <span className={cx('icon')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_1_75)">
                                <path
                                    d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V9C18 7.9 17.1 7 16 7H8C6.9 7 6 7.9 6 9V19ZM9 9H15C15.55 9 16 9.45 16 10V18C16 18.55 15.55 19 15 19H9C8.45 19 8 18.55 8 18V10C8 9.45 8.45 9 9 9ZM15.5 4L14.79 3.29C14.61 3.11 14.35 3 14.09 3H9.91C9.65 3 9.39 3.11 9.21 3.29L8.5 4H6C5.45 4 5 4.45 5 5C5 5.55 5.45 6 6 6H18C18.55 6 19 5.55 19 5C19 4.45 18.55 4 18 4H15.5Z"
                                    fill="#BDBDBD"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_75">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                    <p>delete all</p>
                </button>
            )}
        </div>
    );
}

export default TodoApp;
