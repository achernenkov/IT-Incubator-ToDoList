import React, {useState} from "react";
import {TasksType, FilterValuesType} from './App'
import './App.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title:string) => {
        props.changeTodoListTitle(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeValue={changeTodoListTitle} />
                <button onClick={() => props.removeTodoList(props.id)}>X</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map(task => {

                        const changeTaskTitle = (newValue:string) => {
                            props.changeTaskTitle(task.id, newValue, props.id)
                        }


                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : '' }>
                                <input type="checkbox" checked={task.isDone} onChange={(e) => {props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)}}/>
                                <EditableSpan title={task.title} changeValue={changeTaskTitle} />
                                <button onClick={() => {
                                    props.removeTask(task.id, props.id)
                                }}>X
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={() => {
                    props.changeFilter("all", props.id)
                }}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={() => {
                    props.changeFilter("active", props.id)
                }}>Active
                </button>
                <button className={props.filter ==='completed' ? 'active-filter': ''} onClick={() => {
                    props.changeFilter("completed", props.id)
                }}>Completed
                </button>
            </div>
        </div>
    )
}

export default ToDoList