import type {FilterValuesType, Task} from './Type'
import {Button} from './Button'
import { KeyboardEvent, useRef, useState } from 'react';

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: Task['id']) => void;
  changeTodoListFilter: (filter: FilterValuesType) => void;
  createTask: (title: string) => void;
}


export const TodolistItem = ({title, tasks, deleteTask, changeTodoListFilter, createTask}: Props) => {

  // const inprufRef = useRef<HTMLInputElement>(null);

  const[taskInput, setTaskInput] = useState("");

  const createTaskHandler = () => {
    // if(inprufRef.current?.value) {
    //   inprufRef.current && createTask(inprufRef.current.value);
    //   inprufRef.current.value = "";
    // } 

    // new
    const trimmed = taskInput.trim();
    if(trimmed) {
      createTask(taskInput);
      setTaskInput("");
    }
  }

  const keyDownCreateHandlerTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && !taskInput.length && taskInput.length >= 10) {
      createTaskHandler()
    }
  }


  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input 
            value={taskInput}
            placeholder='Max 10 words'
            onChange={(e) => setTaskInput(e.currentTarget.value)}
            onKeyDown={keyDownCreateHandlerTask}
          />
          <Button 
              title={'+'}  
              onClickHandler={createTaskHandler}
              disabled={!taskInput.trim().length || taskInput.length >= 10}
          />
          {taskInput.length === 0 && <div>Please, enter title</div>}
          {taskInput.length >= 10 && <div style={{color: "red"}}>Max 10 words</div>}
          {taskInput.length !== 0  && taskInput.length <= 10 && <p>task none {taskInput.length}</p>}
        </div>
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
              <ul>
                {tasks.map(task => {
                  const deleteTaskHandler = ()=>deleteTask(task.id)
                  return (
                      <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
                        <Button title={'x'} onClickHandler={deleteTaskHandler}/>
                      </li>
                    )
                  })}
              </ul>
            )}
        <div>
          <Button title={'All'} onClickHandler={() => changeTodoListFilter("all")}/>
          <Button title={'Active'} onClickHandler={() => changeTodoListFilter("active")}/>
          <Button title={'Completed'} onClickHandler={() => changeTodoListFilter("completed")}/>
        </div>
      </div>
  )
}
