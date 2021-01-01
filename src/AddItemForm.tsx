import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TextField} from "@material-ui/core";
import {IconButton} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void

}

let AddItemForm = React.memo((props: AddItemFormType) => {

    console.log('Перерисовка AddItemForm')

// state

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

// function

    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (event.key === 'Enter') addItem()
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
            setTitle("")
        } else {
            setError('Title is required!')
        }
        setTitle("")
    }

// JSX

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onTitleChangeHandler}
                onKeyPress={onKeyDownAddItem}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            <IconButton onClick={addItem}>
                <AddCircle/>
            </IconButton>
        </div>
    )
})

export default AddItemForm;