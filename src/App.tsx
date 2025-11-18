import { useState } from 'react'
import './App.css'
import {TodolistItem} from './TodolistItem'
import { FilterValuesType, Task, TaskStateType, TodoListType } from './Type';
import { v1 } from 'uuid';
import { CreateItemForm } from './CreateItemForm';


export const App = () => {
  // BLL (model)
  // new todolidt
  const todolistId_1 = v1();
  const todolistId_2 = v1();

  const [todolist, setTodolist] = useState<TodoListType[]>([
    {id: todolistId_1, title: "What to learn", filter: 'all'},
    {id: todolistId_2, title: "What to buy", filter: 'all',},
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todolistId_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: false },
      { id: v1(), title: 'JS', isDone: false },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'Typescript', isDone: false },
      { id: v1(), title: 'RTK query', isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Beer', isDone: false },
      { id: v1(), title: 'Snack', isDone: false },
      { id: v1(), title: 'Bread', isDone: false },
      { id: v1(), title: 'Butter', isDone: false },
      { id: v1(), title: 'Tea', isDone: false },
    ],
  });


  // tasks

  // delete task    // new todolidt
  const deleteTask = (taskId: Task['id'], id: TodoListType['id']) => {
    const nextState: TaskStateType = {...tasks, [id]: tasks[id].filter(t => t.id !== taskId)};
    setTasks(nextState);
  }

  // create input   // new todolidt
  const  createTask = (title: Task["title"], id: TodoListType['id']) => {
    const newTask: Task = {id: v1(), title: title, isDone: false};
    const nextState: TaskStateType = {...tasks, [id]: [newTask, ...tasks[id]]};
    setTasks(nextState);
  }

  // changed status  // new todolidt
  const changeTaskStatus = (taskId: Task['id'], newIsDoneValue: Task['isDone'], id: TodoListType['id']) => {
    const nextState: TaskStateType = {...tasks, [id]: tasks[id].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)};
    setTasks(nextState);
  }

  const changeTaskTitle = (taskId: Task['id'], title: Task['title'], id: TodoListType['id']) => {
    const nextState: TaskStateType = {...tasks, [id]: tasks[id].map(t => t.id === taskId ? {...t, title: title} : t)};
    setTasks(nextState);
  }


  // todolists 

  // GUI (view)  // new todolidt
  const changeTodoListFilter = (filter: FilterValuesType, id: TodoListType['id']) => {
    const nextState: TodoListType[] = todolist.map(t => t.id === id ? {...t, filter: filter}: t);
    setTodolist(nextState);
  }

    // delete todolist  // new todolidt 
  const deletTodolis = (id: TodoListType['id']) => {
    const nextState: TodoListType[] = todolist.filter(tl => tl.id !== id);
    setTodolist(nextState);
    // delete Tasks
    const nextTaskState: TaskStateType = {...tasks};
    delete nextTaskState[id];
    setTasks(nextTaskState);
  }

    // new todolidt
  const createTodolist = (title: TodoListType["title"]) => {
    const newTodolistid = v1();
    const newTodolist: TodoListType = {
      id: newTodolistid, title: title, filter: "all"
    }

    setTodolist([newTodolist, ...todolist]);
    setTasks({[newTodolistid]: [], ...tasks})
  }

  const getFilteredTasks = (tasks: Task[], filter: FilterValuesType): Task[] => {
    return filter === "active"
      ? tasks.filter(t => !t.isDone)
      : filter === "completed"
      ? tasks.filter(t => t.isDone)
      : tasks
  }

  const changeTodolistTitle = (title: TodoListType["title"], id: TodoListType['id']) => {
    const nextState: TodoListType[] = todolist.map(t => t.id === id ? {...t, title: title} : t);
    setTodolist(nextState);
  }



  // new todolidt 
  const tododListComponents = todolist.map(tl => {
    return (
      <TodolistItem 
        key={tl.id}
        id={tl.id}
        filterS={tl.filter}
        title={tl.title} 
        tasks={getFilteredTasks(tasks[tl.id], tl.filter)} // ?
        deleteTask={deleteTask} 
        deletTodolis={deletTodolis}
        changeTodoListFilter={changeTodoListFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        changeTodolistTitle={changeTodolistTitle}
      />
    )
  })

  return (
    <div className="app">
      <CreateItemForm createItem={createTodolist} maxItemTitleLength={12} />
      {tododListComponents}
    </div>
  )
}


