import React, { useState, useEffect, useRef} from 'react';
import { MdOutlineArrowDropDown } from "react-icons/md";

function Timer() {
     const [todo, setTodo] = useState(false)


     const handleTodo = () => {
        setTodo(prev => !prev);
     }


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
                                    className='text-center border-none bg-transparent text-slate-800 focus:outline-none placeholder:text-slate-800 text-[90px] font-bold'
                                    placeholder='00'
                                />
                            </div>
                            <span className='text-stone-600 font-bold mt-4'>Hours</span>
                        </div>

                       
                        <span className='text-white font-bold text-[100px] mx-6'>:</span>

                        
                        <div className='flex flex-col items-center'>
                            <div className='bg-cyan-800 rounded-lg shadow-md h-40 w-40 flex items-center justify-center'>
                                <input 
                                    type='text'
                                    className='text-center border-none bg-transparent text-slate-800 focus:outline-none placeholder:text-slate-800 text-[90px] font-bold'
                                    placeholder='00'
                                />
                            </div>
                            <span className='text-stone-600 font-bold mt-4'>Minutes</span>
                        </div>
                    </div>
                </div>

               
                <button className='mt-8 w-32 h-12 bg-slate-800 text-white font-semibold rounded-md shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer'>
                    Start
                </button>
                <button className='absolute top-4 left-4 left-4 flex items-center mt-50 ml-20 bg-none text-[22px] text-stone-400 transition-all duration-300 hover:text-white cursor-pointer'>
                <MdOutlineArrowDropDown  className='mr-2 text-[40px]'/>
                Tasks
                </button>
            </div>
            { todo && ( 
                <div></div>
            )}
        </div>
    );
}

export default Timer;
