import React, {useState} from "react";
import {TasksType, FilterValuesType} from './App'
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
    changeTaskStatus: (taskID:string, isDone:boolean, todoListID: string) => void
    filter:FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID:string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function ToDoList(props: PropsTypeToDoList) {

// function

    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title:string) => {
        props.changeTodoListTitle(title, props.id)
    }

    const removeTodoList = () => props.removeTodoList(props.id)

// JSX

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeValue={changeTodoListTitle} />
                {/*<button onClick={removeTodoList}>X</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', padding: '0'}}>
                {
                    props.tasks.map(task => {

                        const changeTaskTitle = (newValue:string) => {
                            props.changeTaskTitle(task.id, newValue, props.id)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : '' }>
                                <Checkbox
                                    size={"small"}
                                    color={"primary"}
                                    checked={task.isDone}
                                    onChange={(e) => {props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)}}
                                />
                                {/*<input type="checkbox"*/}
                                {/*       checked={task.isDone}*/}
                                {/*       onChange={(e) => {props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)}}*/}
                                {/*/>*/}
                                <EditableSpan
                                    title={task.title}
                                    changeValue={changeTaskTitle}
                                />
                                <IconButton onClick={() => {props.removeTask(task.id, props.id)}}>
                                    <Delete/>
                                </IconButton>
                                {/*<button*/}
                                {/*    onClick={() => {props.removeTask(task.id, props.id)}}>X*/}
                                {/*</button>*/}
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
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={() => {props.changeFilter("all", props.id)
                }}>All
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === 'active' ? 'contained' : "outlined"}
                    color={"primary"}
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={() => {props.changeFilter("active", props.id)
                }}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === 'completed' ? 'contained' : "outlined"}
                    color={"primary"}
                    // className={props.filter ==='completed' ? 'active-filter': ''}
                    onClick={() => {props.changeFilter("completed", props.id)
                }}>Completed
                </Button>
            </div>
        </div>
    )
}

export default ToDoList