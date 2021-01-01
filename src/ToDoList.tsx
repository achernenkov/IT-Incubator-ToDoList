import React, {useCallback, useState} from "react";
import {TasksType, FilterValuesType} from './AppOldVersion'
import './App.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import Task from './Task'

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


    // for Task components

    const removeTaskHandler = useCallback((taskID: string) => {
        props.removeTask(taskID, props.id )
    }, [props.id, props.removeTask])

    const changeTaskStatusHandler = useCallback((taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone, props.id)
    }, [props.id, props.changeTaskStatus])

    const changeTaskTitleHandler = useCallback((taskID: string, newValue: string) => {
        props.changeTaskTitle(taskID, newValue, props.id)
    }, [props.id, props.changeTaskTitle])

    // end for task components
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
                        return (
                           <Task
                                task={task}
                                removeTaskHandler={removeTaskHandler}
                                changeTaskStatusHandler={changeTaskStatusHandler}
                                changeTaskTitleHandler={changeTaskTitleHandler}
                           />
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