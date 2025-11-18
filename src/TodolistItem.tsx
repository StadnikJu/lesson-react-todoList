import type {FilterValuesType, Task, TodoListType} from './Type'
import {Button} from './Button'
import { ChangeEvent } from 'react';
import { CreateItemForm } from './CreateItemForm';
import { EditableSpan } from './EditableSpan';

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
  changeTaskTitle: (taskId: Task['id'], title: Task['title'], id: TodoListType['id']) => void;
  changeTodolistTitle: (title: TodoListType["title"], id: TodoListType['id']) => void;
}


export const TodolistItem = ({id, title, tasks, filterS, deleteTask, changeTodoListFilter, createTask, changeTaskStatus, deletTodolis, changeTaskTitle, changeTodolistTitle}: Props) => {
  const deleteTodoListHandler = () => deletTodolis(id)
  const createTaskHandler = (taskTitle: Task['title']) => createTask(taskTitle, id);
  const changeTodolistTitleHandler = (title: TodoListType["title"]) => {
    changeTodolistTitle(title, id);
  }


  return (
  <div>
    <h3>
      <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
      <Button title='X' onClickHandler={deleteTodoListHandler}/>
    </h3>
    <CreateItemForm createItem={createTaskHandler} maxItemTitleLength={10}/>

    
    {tasks.length === 0 ? (
        <p>Тасок нет</p>
    ) : (
          <ul>
            {tasks.map(task => {
              const deleteTaskHandler = () => deleteTask(task.id, id);
              const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, id);
              const changeTaskTitleHandler = (title: Task["title"]) => changeTaskTitle(task.id, title, id);
              return (
                  <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                    <input 
                      type="checkbox" 
                      checked={task.isDone}  
                      onChange={changeTaskStatusHandler}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
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
