import type {FilterValuesType, Task, TodoListType} from './Type'
//import {Button} from './Button'
import { ChangeEvent } from 'react';
import { CreateItemForm } from './CreateItemForm';
import { EditableSpan } from './EditableSpan';
import { Box, Button, Checkbox, IconButton, List, ListItem } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { containerSx, getListItemSx} from './App-styles';


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
      <IconButton
        size='small'
        onClick={deleteTodoListHandler}
      >
        <HighlightOffIcon />
      </IconButton>
    </h3>
    <CreateItemForm createItem={createTaskHandler} maxItemTitleLength={10}/>

    
    {tasks.length === 0 ? (
        <p>Тасок нет</p>
    ) : (
          <List>
            {tasks.map(task => {
              const deleteTaskHandler = () => deleteTask(task.id, id);
              const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, id);
              const changeTaskTitleHandler = (title: Task["title"]) => changeTaskTitle(task.id, title, id);
              return (
                  <ListItem disableGutters divider key={task.id} sx={containerSx}>
                    <Box sx={getListItemSx(task.isDone)}>
                      <Checkbox 
                        size="small"
                        checked={task.isDone}  
                        onChange={changeTaskStatusHandler}/>
                      <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                    </Box>
                      <IconButton size='small' color='primary' onClick={deleteTaskHandler}>
                        <HighlightOffIcon />
                      </IconButton>
                  </ListItem>
                )
              })}
          </List>
        )}

    <Box sx={containerSx}>
      <Button
        size="small"
        disableElevation
        variant="contained"
        color={filterS === "all" ? "secondary" : "primary"}
        onClick={() => changeTodoListFilter("all", id)}
      >
        All
      </Button>

      <Button
        size="small"
        disableElevation
        variant="contained"
        color={filterS === "active" ? "secondary" : "primary"}
        onClick={() => changeTodoListFilter("active", id)}
      >
        Active
      </Button>

      <Button
        size="small"
        disableElevation
        variant="contained"
        color={filterS === "completed" ? "secondary" : "primary"}
        onClick={() => changeTodoListFilter("completed", id)}
      >
        Completed
      </Button>
    </Box>
  </div>
)
}


