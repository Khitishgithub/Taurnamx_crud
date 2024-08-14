"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Page({ params }) {
    const id = params.id;
    const { push } = useRouter();
    const [value, setValue] = useState({
        title: "",
        desc: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/todo');
                if (Array.isArray(response.data.todos)) {
                    const todo = response.data.todos.find(item => item._id === id);
                    if (todo) {
                        setValue({
                            title: todo.title,
                            desc: todo.desc
                        });
                    } else {
                        toast.error("Todo item not found.");
                    }
                } else {
                    toast.error("Unexpected data format.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data.");
            }
        };

        fetchData();
    }, [id]);

    const handleOnChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            if (id) {
                const request = await axios.put(`/api/todo/${id}`, value);
                const response = request.data;
                if (request.status === 200) {
                    toast.success(response.message);
                    push('/');
                }
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <>
            <div className='flex justify-center h-screen'>
                <div className='mt-8 flex gap-8 flex-col p-10 rounded-lg h-80 shadow-lg bg-customPurple'>
                    <h1 className='text-white font-bold text-2xl'>Update Topic</h1>
                    <label className="relative block">
                        <input
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder="Enter your title"
                            type="text"
                            value={value.title}
                            name='title'
                            onChange={handleOnChange}
                        />
                    </label>
                    <label className="relative block">
                        <input
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder="Enter your description"
                            type="text"
                            value={value.desc}
                            name='desc'
                            onChange={handleOnChange}
                        />
                    </label>
                    <button
                        className='rounded-lg bg-green-500 px-4 py-2 text-white font-bold'
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </div>
            </div>
        </>
    );
}
