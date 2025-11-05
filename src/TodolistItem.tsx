import type {FilterValuesType, Task, TodoListType} from './Type'
import {Button} from './Button'
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type Props = {
  id: TodoListType['id'];
  title: string;
  tasks: Task[];
  filterS: FilterValuesType;
  deleteTask: (taskId: Task['id'], id: TodoListType['id']) => void;
  changeTodoListFilter: (filter: FilterValuesType, id: TodoListType['id']) => void;
  createTask: (title: string, id: TodoListType['id']) => void;
  changeTaskStatus: (taskId: Task['id'], newIsDoneValue: Task['isDone'], id: TodoListType['id']) => void;
  deletTodolis: (id: TodoListType['id']) => void;
}


export const TodolistItem = ({id, title, tasks, filterS, deleteTask, changeTodoListFilter, createTask, changeTaskStatus, deletTodolis}: Props) => {

  const[taskInput, setTaskInput] = useState("");
  const[error, setError] = useState(false);

  const createTaskHandler = () => {
    const trimmed = taskInput.trim();
    if(trimmed) {
      createTask(trimmed, id);
    } else {
      setError(true);
    }

    setTaskInput("");
  }

  const keyDownCreateHandlerTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && !taskInput.length && taskInput.length >= 10) {
      createTaskHandler()
    }
  }
  
  const deleteTodoListHandler = () => deletTodolis(id)


  return (
      <div>
        <Button title='X' onClickHandler={deleteTodoListHandler}/>
        <h3>{title}</h3>
        <div>
          <input 
            value={taskInput}
            placeholder='Max 10 words'
            onChange={(e) => {setTaskInput(e.currentTarget.value); setError(false)}}
            onKeyDown={keyDownCreateHandlerTask}
            className={error ? 'inputError ' : ''}
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
                  const deleteTaskHandler = () => deleteTask(task.id, id);
                  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, id)
                  return (
                      <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                        <input 
                          type="checkbox" 
                          checked={task.isDone}  
                          onChange={changeTaskStatusHandler}
                        />
                        <span>{task.title}</span>
                        <Button title={'x'} onClickHandler={deleteTaskHandler}/>
                      </li>
                    )
                  })}
              </ul>
            )}
        <div>
          <Button title={'All'} 
                  onClickHandler={() => changeTodoListFilter("all", id)} 
                  className={filterS === 'all' ? "filter-btn-active" : ""}
          />
          <Button title={'Active'} 
                  onClickHandler={() => changeTodoListFilter("active", id)} 
                  className={filterS === 'active' ? "filter-btn-active" : ""}
          />
          <Button title={'Completed'} 
                  onClickHandler={() => changeTodoListFilter("completed", id)} 
                  className={filterS === 'completed' ? "filter-btn-active" : ""}
          />
        </div>
      </div>
  )
}
