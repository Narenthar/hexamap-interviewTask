import React, { useState, useEffect,useContext } from 'react';
import {Container} from 'react-bootstrap'
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import { TaskContext } from '../context/taskContext';


const ToDoPage = ({theme}) => {
    const context = useContext(TaskContext);
    const {tasks, setTasks} = context; 
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const [activeTask, setActiveTask] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    useEffect(()=>{
        if(storedTasks?.length > 0) {
            setTasks(storedTasks);
          }
    },[])
    useEffect(() => {
        let intervalId;
        if (activeTask) {
          intervalId = setInterval(() => {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
              task.id === activeTask.id ? { ...task, duration: task.duration + 1 } : task
              )
            );
          }, 1000);
        }
        saveTasks();
        return () => clearInterval(intervalId);
      }, [activeTask, setTasks, tasks]);

      const handleAddTask = (newTask) => {
        setActiveTask(newTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === activeTask?.id ? { ...task, isActive: false } : task))
        );
        setTasks([...tasks, newTask]);
      };
    
      const handleUpdateTask = (updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
      };
    
      const handleStartEdit = (task) => {
        setEditingTask(task);
      };
    
      const handleStopEdit = () => {
        setEditingTask(null);
      };
    
      const handlePauseTask = () => {
        setActiveTask(null);
      };
    
      const handleResumeTask = (task) => {
        setActiveTask(task);
      };
    
      const handleDeleteTask = (taskId) => {
        let filteredTask = tasks.filter((task) => task.id !== taskId)
        setTasks(filteredTask);
      };


    return (
      <Container className="my-5">
        <h1 className="text-center mb-4">Todo Tasks</h1>
        <ToDoForm onAddTask={handleAddTask} />
        <ToDoList
          tasks={tasks}
          activeTask={activeTask}
          editingTask={editingTask}
          onStartEdit={handleStartEdit}
          onStopEdit={handleStopEdit}
          onUpdateTask={handleUpdateTask}
          onPauseTask={handlePauseTask}
          onResumeTask={handleResumeTask}
          onDeleteTask={handleDeleteTask}
        />
        
      </Container>
    );
}
export default ToDoPage