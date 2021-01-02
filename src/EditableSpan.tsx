import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    title: string
    changeValue: (newValue: string) => void
}

const EditableSpan:React.FC<EditableSpanType> = (props) => {

// state

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

// function

    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

// JSX

    return (
        editMode
            ?

            <TextField
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onBlur={deActivatedEditMode}
                autoFocus={true}
            />

            : <span onDoubleClick={activatedEditMode}>{props.title}</span>
    )
}

export default EditableSpan;