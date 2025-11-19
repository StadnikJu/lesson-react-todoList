import { Button, TextField } from "@mui/material";
import { useState } from "react";
//import { Button } from "./Button"
import {  KeyboardEvent } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export type ItemFormType = {
  createItem: (itemTitle: string) => void;
  maxItemTitleLength: number;
}

export const CreateItemForm = ({createItem, maxItemTitleLength}: ItemFormType) => {
  const[itemInput, setItemInput] = useState("");
  const[error, setError] = useState(false);

  // 1
  const keyDownCreateHandlerItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && !itemInput.length && itemInput.length >= 10) {
      createTaskHandler()
    }
  }

  //2
  const createTaskHandler = () => {
  const trimmed = itemInput.trim();
    if(trimmed) {
      createItem(trimmed);
    } else {
      setError(true);
    }
    setItemInput("");
  }


  return (
    <div>
      <TextField 
        variant="outlined"
        size="small"
        error={error}
        value={itemInput}
        placeholder='Max 10 words'
        onChange={(e) => {setItemInput(e.currentTarget.value); setError(false)}}
        onKeyDown={keyDownCreateHandlerItem}
      />
      <Button 
        size='small' 
        color='primary' 
        onClick={createTaskHandler}
        disabled={!itemInput.trim().length || itemInput.length >= maxItemTitleLength}
      >
        <AddCircleIcon />
      </Button>
      {itemInput.length === 0 && <div>Please, enter title</div>}
      {itemInput.length >= maxItemTitleLength && <div style={{color: "red"}}>Max {maxItemTitleLength} words</div>}
      {itemInput.length !== 0  && itemInput.length <= maxItemTitleLength && <p>task none {itemInput.length}</p>}
    </div>
  )
}