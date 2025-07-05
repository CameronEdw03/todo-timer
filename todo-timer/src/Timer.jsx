import React, { useState, useEffect } from 'react';
import { MdOutlineArrowDropDown } from "react-icons/md";

function Timer() {
    const [todo, setTodo] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);

    const handleTaskInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setTasks((prevTasks) => [...prevTasks, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleTodo = () => {
        setTodo((prev) => !prev);
    };

    const handleClearTasks = () => {
        setTasks([]);
    };

    const handleHoursChange = (e) => {
        const value = e.target.value;
        if (value === '' || (/^\d{1,2}$/.test(value) && parseInt(value) <= 99)) {
            setHours(value);
        }
    };

    const handleMinutesChange = (e) => {
        const value = e.target.value;
        if (value === '' || (/^\d{1,2}$/.test(value) && parseInt(value) <= 59)) {
            setMinutes(value);
        }
    };

    const handleStart = () => {
        const h = parseInt(hours) || 0;
        const m = parseInt(minutes) || 0;
        const total = h * 3600 + m * 60;
        
        if (total > 0) {
            setTotalSeconds(total);
            setIsRunning(true);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTotalSeconds(0);
        setHours('');
        setMinutes('');
    };

    useEffect(() => {
        let interval = null;
        if (isRunning && totalSeconds > 0) {
            interval = setInterval(() => {
                setTotalSeconds(seconds => {
                    if (seconds <= 1) {
                        setIsRunning(false);
                        return 0;
                    }
                    return seconds - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, totalSeconds]);

    useEffect(() => {
        if (isRunning) {
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            setHours(h.toString().padStart(2, '0'));
            setMinutes(m.toString().padStart(2, '0'));
        }
    }, [totalSeconds, isRunning]);

    return (
        <div className="relative w-full h-screen">
            <img 
                src='/Background.jpg'
                alt='Background'
                className='absolute top-0 left-0 w-full h-full object-cover z-0'
            />
            <div className='flex flex-col items-center justify-center h-full relative z-10'>
                <div className='bg-stone-800/30 backdrop-blur-md rounded-lg shadow-lg w-[520px] flex flex-col items-center py-10 px-6'>
                    <div className='flex items-center'>
                        <div className='flex flex-col items-center'>
                            <div className='bg-cyan-800 rounded-lg shadow-md h-40 w-40 flex items-center justify-center'>
                                <input
                                    type='text'
                                    className='text-center border-none bg-transparent text-slate-800 focus:outline-none placeholder:text-slate-800 text-[90px] font-bold w-full h-full'
                                    placeholder='00'
                                    value={hours}
                                    onChange={handleHoursChange}
                                    disabled={isRunning}
                                />
                            </div>
                            <span className='text-stone-600 font-bold mt-4'>Hours</span>
                        </div>
                        <span className='text-white font-bold text-[100px] mx-6'>:</span>
                        <div className='flex flex-col items-center'>
                            <div className='bg-cyan-800 rounded-lg shadow-md h-40 w-40 flex items-center justify-center'>
                                <input 
                                    type='text'
                                    className='text-center border-none bg-transparent text-slate-800 focus:outline-none placeholder:text-slate-800 text-[90px] font-bold w-full h-full'
                                    placeholder='00'
                                    value={minutes}
                                    onChange={handleMinutesChange}
                                    disabled={isRunning}
                                />
                            </div>
                            <span className='text-stone-600 font-bold mt-4'>Minutes</span>
                        </div>
                    </div>
                </div>

                <div className='flex gap-4 mt-8'>
                    {!isRunning ? (
                        <button 
                            className='w-32 h-12 bg-slate-800 text-white font-semibold rounded-md shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer'
                            onClick={handleStart}
                        >
                            Start
                        </button>
                    ) : (
                        <button 
                            className='w-32 h-12 bg-slate-800 text-white font-semibold rounded-md shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer'
                            onClick={handleStop}
                        >
                            Stop
                        </button>
                    )}
                    <button 
                        className='w-32 h-12 bg-gray-600 text-white font-semibold rounded-md shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
                <button 
                    className='absolute top-4 left-4 flex items-center bg-none text-[22px] text-stone-400 transition-all duration-300 hover:text-white cursor-pointer'
                    onClick={handleTodo}
                >
                    <MdOutlineArrowDropDown 
                        className={`mr-2 text-[40px] transition-transform duration-300 ${
                            todo ? 'rotate-180' : 'rotate-0'
                        }`}
                    />
                    Tasks
                </button>
            </div>
            {todo && ( 
                <div className='absolute top-16 left-4 w-[300px] h-[500px] bg-stone-600/30 backdrop-blur-md rounded-lg shadow-lg p-4 z-20'>
                    <h2 className='text-white text-lg font-semibold mb-4'>Tasks</h2>
                    <input
                        type='text'
                        className='w-full p-2 mb-4 bg-stone-800/30 border border-none backdrop-blue-md rounded-md text-white placeholder:text-stone-400 focus:outline-none'
                        placeholder='Add a new task...'
                        value={inputValue}
                        onChange={handleTaskInputChange}
                        onKeyDown={handleKeyPress}
                    />
                    <ul className='list-disc list-inside text-white'>
                        {tasks.map((task, index) => (
                            <li key={index} className='mb-2'>{task}</li>
                        ))}
                    </ul>
                 
                    {tasks.length > 0 && (
                        <button
                            className='w-full h-10 rounded-md mt-4 bg-stone-800/30 text-white font-bold transition-all duration-300 hover:bg-white hover:text-cyan-800 cursor-pointer'
                            onClick={handleClearTasks}
                        >
                            Clear Tasks
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Timer;