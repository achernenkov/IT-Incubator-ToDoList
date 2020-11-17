import React, {ChangeEvent, useState, KeyboardEvent} from "react";

type AddItemFormType = {
    addItem: (title: string) => void

}

function AddItemForm(props: AddItemFormType) {

// state

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

// function

    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
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
            <input
                value={title}
                onChange={onTitleChangeHandler}
                onKeyPress={onKeyDownAddItem}
                className={error ? 'error' : ''}
            />

            <button onClick={addItem}>+</button>

            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}

export default AddItemForm;