import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    changeValue: (newValue: string) => void
}

function EditableSpan(props: EditableSpanType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState <string> (props.title)
    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () =>{
        setEditMode(false)
        props.changeValue(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    return(
        editMode
            ? <input value={title} onBlur={deActivatedEditMode} autoFocus={true}

            onChange={changeTitle}
            />
            : <span onDoubleClick={activatedEditMode}>{props.title}</span>
        )
}

export default EditableSpan;