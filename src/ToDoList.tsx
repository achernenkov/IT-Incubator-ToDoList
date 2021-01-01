import React, {useCallback, useState} from "react";
import {TasksType, FilterValuesType} from './App'
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
    _addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    _removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    _changeTodoListTitle: (title: string, todoListID: string) => void
}

const ToDoList: React.FC<PropsTypeToDoList> = React.memo(({
                                                              id,
                                                              title,
                                                              tasks,
                                                              _addTask,
                                                              removeTask,
                                                              changeFilter,
                                                              changeTaskStatus,
                                                              filter,
                                                              _removeTodoList,
                                                              changeTaskTitle,
                                                              _changeTodoListTitle
                                                          }) => {

// function

    const addTask = useCallback((title: string) => {
        _addTask(title, id)
    }, [_addTask, id])

    const changeTodoListTitle = useCallback((title: string) => {
        _changeTodoListTitle(title, id)
    }, [_changeTodoListTitle, id])

    const removeTodoList = useCallback(() => _removeTodoList(id), [_removeTodoList, id])

    const onAllClickHandler = useCallback(() => changeFilter("all", id), [changeFilter, id])

    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [changeFilter, id])

    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [changeFilter, id])

    const removeTaskHandler = useCallback((taskID: string) => {
        removeTask(taskID, id)
    }, [id, removeTask])

    const changeTaskStatusHandler = useCallback((taskID: string, isDone: boolean) => {
        changeTaskStatus(taskID, isDone, id)
    }, [id, changeTaskStatus])

    const changeTaskTitleHandler = useCallback((taskID: string, newValue: string) => {
        changeTaskTitle(taskID, newValue, id)
    }, [id, changeTaskTitle])

    let tasksForTodoList = tasks

    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => !task.isDone)
    }

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => task.isDone)
    }

// JSX

    return (
        <div key={id}>
            <h3>
                <EditableSpan title={title} changeValue={changeTodoListTitle}/>
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
                    variant={filter === 'all' ? 'contained' : "outlined"}
                    color={"primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    size={"small"}
                    variant={filter === 'active' ? 'contained' : "outlined"}
                    color={"primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={filter === 'completed' ? 'contained' : "outlined"}
                    color={"primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

export default ToDoList