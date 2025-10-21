import { useState } from 'react'
import './App.css'
import {TodolistItem} from './TodolistItem'
import { FilterValuesType, Task } from './Type';
import { v1 } from 'uuid';

// CRUD - CREATE READ UPDATE DELETE 


export const App = () => {
  // BLL (model)

  const todolist: string = "What to learn";

  const [tasks, setTasks] = useState<Task[]>(
    [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'Typescript', isDone: false },
      { id: v1(), title: 'RTK query', isDone: false },
    ]
  );

  const deleteTask = (taskId: Task['id']) => {
    // 1. Create next state
    const nextState: Task[] = tasks.filter(t => t.id !== taskId)
    // 2. Update data
    setTasks(nextState) // setTasks(tasks.filter(t => t.id !== taskId)
  }

  // GUI (view)
  const [filter, setfilter] = useState<FilterValuesType>("all");
  const changeTodoListFilter = (filter: FilterValuesType) => {
    setfilter(filter)
  }

  const getFilteredTasks = (tasks: Task[], filter: FilterValuesType):Task[] => {
    // либо так:
    return filter === "active"
      ? tasks.filter(t => !t.isDone)
      : filter === "completed"
      ? tasks.filter(t => t.isDone)
      : tasks
  }


  // create input 
  const  createTask = (title: string) => {
    //1. Create next state(immutable);
    // const newTask: Task = {
    //   id: v1(), 
    //   title: title,
    //   isDone: false,
    // }

    // const nextState: Task[] = [...tasks, newTask];

    //2. Update data
    //setTasks(nextState);

    setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
  }

  return (
      <div className="app">
        <TodolistItem 
          title="What to learn" 
          tasks={getFilteredTasks(tasks, filter)}
          deleteTask={deleteTask} 
          changeTodoListFilter={changeTodoListFilter}
          createTask={createTask}
        />
      </div>
  )
}


// crypto.randomUUID()