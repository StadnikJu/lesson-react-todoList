import { useState } from "react";

export type EditableSpanType = {
    title: string;
    changeTitle: (newTitle: string) => void;
}

export const EditableSpan = ({title, changeTitle}: EditableSpanType) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [titleInput, setTitleInput] = useState(title);

    const onEditeMode = () => setIsEditMode(true);
    const ofEditeMode = () => {
        changeTitle(titleInput);
        setIsEditMode(false);
    };

   

    return (
        isEditMode ? <input autoFocus value={titleInput} onChange={(e) => setTitleInput(e.currentTarget.value)} onBlur={ofEditeMode}/> : <span onDoubleClick={onEditeMode}>{title}</span>
    )
}