"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todo");
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching Topic:", error);
        toast.error("Failed to fetch Topic.");
      }
    };
    fetchTodos();
  }, [refreshState]);

  const handleAdd = () => {
    push('/add');
  };

  const handleDelete = (id) => {
    setIsModalVisible(true);
    setId(id);
  };

  const handleEdit = (id) => {
    push(`/edit/${id}`);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleDeleteTodo = async () => {
    try {
      const response = await axios.delete(`/api/todo/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsModalVisible(false);
        setRefreshState(!refreshState); 
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        onClose={closeModal}
        handleDelete={handleDeleteTodo}
      />
      <div className='flex justify-center items-center'>
        <div className='flex flex-col gap-10 p-8 rounded-lg shadow-xl bg-yellow-200 mt-10 w-2/4'>
          <div className='flex justify-between items-center w-full'>
            <h1 className='font-bold text-3xl'>Tournamax Assignment</h1>
            <button
              className='rounded-none bg-customPurple px-4 py-2 text-white flex items-center'
              onClick={handleAdd}
            >
              Add Topic
              <IoMdAdd className='ml-2' />
            </button>
          </div>
          <div className='text-start flex flex-col gap-5'>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className='flex justify-between items-center w-full border-b-customPurple border-b-4 rounded-xl p-2'
                >
                  <div className='w-60 flex flex-col gap-1'>
                    <h5 className='font-bold text-xl'>{todo.title}</h5>
                    <p className='text-sm'>{todo.desc}</p>
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    <MdDelete
                      size={23}
                      color='red'
                      cursor='pointer'
                      onClick={() => handleDelete(todo._id)}
                    />
                    <FaEdit
                      size={20}
                      className='text-end'
                      cursor='pointer'
                      onClick={() => handleEdit(todo._id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center text-lg'>No Topic available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
