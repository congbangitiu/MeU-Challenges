import classNames from 'classnames/bind';
import styles from './TodoApp.module.scss';
import React, { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function TodoApp() {
    const inputRef = useRef();
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState(() => {
        const storageJobs = JSON.parse(localStorage.getItem('jobs'));
        return storageJobs;
    });
    // const [showIcon, setShowIcon] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [filterMode, setFilterMode] = useState('all');
    const [activeTab, setActiveTab] = useState('all');

    const handleSubmit = (e) => {
        setTasks((prev) => {
            const newTask = {
                id: Date.now(), // Thêm id duy nhất cho task
                name: task,
            };
            const newTasks = [...prev, task];

            //save to local storage
            const jsonTasks = JSON.stringify(newTasks);
            localStorage.setItem('jobs', jsonTasks);
            return newTasks;
        });
        setTask('');
        inputRef.current.focus();

        // khi có kí tự trong ô input thì nút "Add" mới hoạt động
        e.currentTarget.disabled = true;
    };

    const handleCheckbox = (index) => {
        setCompletedTasks((prev) => {
            const newCompletedTasks = [...prev];
            newCompletedTasks[index] = !newCompletedTasks[index];
            return newCompletedTasks;
        });
    };

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

    const filteredTasks = tasks.filter((_, index) => {
        if (filterMode === 'all') return true;
        else if (filterMode === 'active') {
            return !completedTasks[index];
        } else if (filterMode === 'completed') {
            return completedTasks[index];
        }
    });

    // Kiểm tra xem filterMode có là "completed" hay không
    const isCompletedMode = filterMode === 'completed';

    const deleteTask = (index) => {
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            newTasks.splice(index, 1);
            return newTasks;
        });
        setCompletedTasks((prevCompletedTasks) => {
            const newCompletedTasks = [...prevCompletedTasks];
            newCompletedTasks.splice(index, 1);
            return newCompletedTasks;
        });
    };

    const deleteAll = () => {
        const incompleteTasks = tasks.filter((_, index) => !completedTasks[index]);
        setTasks(incompleteTasks);
        setCompletedTasks(new Array(incompleteTasks.length).fill(false));
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
                        />
                        <button disabled={!task} className={cx('submit-btn')} onClick={handleSubmit}>
                            Add
                        </button>
                    </div>
                )}
            </div>
            <ul className={cx('taskList')}>
                {filteredTasks?.map((task, index) => (
                    <li className={cx('duties')} key={index}>
                        <input className={cx('check-btn')} type="checkbox" onClick={() => handleCheckbox(index)} />
                        <span className={cx('duties', { completed: completedTasks[index] })}>
                            <p>{task}</p>
                        </span>
                        {isCompletedMode && (
                            <span
                                className={cx('icon')}
                                onClick={() => {
                                    deleteTask();
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
