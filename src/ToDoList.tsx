import React, {useCallback, useState} from "react";
import {TasksType, FilterValuesType} from './AppOldVersion'
import './App.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Button} from "@material-ui/core";

type PropsTypeToDoList = {
    id: string
    title: string
    tasks: Array<TasksType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

const ToDoList = React.memo((props: PropsTypeToDoList) => {

// function

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id])

    const removeTodoList = useCallback(() => props.removeTodoList(props.id), [props.removeTodoList, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])

    let tasksForTodoList = props.tasks

    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(task => !task.isDone)
    }

    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(task => task.isDone)
    }

// JSX

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', padding: '0'}}>
                {
                    tasksForTodoList.map(task => {

                        const changeTaskTitle = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    size={"small"}
                                    color={"primary"}
                                    checked={task.isDone}
                                    onChange={(e) => {
                                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                                    }}
                                />

                                <EditableSpan
                                    title={task.title}
                                    changeValue={changeTaskTitle}
                                />
                                <IconButton onClick={() => {
                                    props.removeTask(task.id, props.id)
                                }}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    size={"small"}
                    variant={props.filter === 'all' ? 'contained' : "outlined"}
                    color={"primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === 'active' ? 'contained' : "outlined"}
                    color={"primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === 'completed' ? 'contained' : "outlined"}
                    color={"primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

export default ToDoList