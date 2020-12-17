import React, {useReducer, useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReducers() {

// state

    let todoLists = useSelector<AppRootStateType, Array<TodoListType> >(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType >(state => state.tasks)
    let dispatch = useDispatch()
// function
    // task
    function removeTask(taskID: string, todoListID: string) {
        dispatch(RemoveTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatch(ChangeTaskStatusAC(taskID, isDone, todoListID))
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatch(ChangeTaskTitleAC(taskID, title, todoListID))
    }

    // todolist

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatch(ChangeTodolistFilterAC(todoListID,newFilterValue ))
    }

    function removeTodoList(todoListID: string) {
        dispatch(RemoveTodoListAC(todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(ChangeTodolistTitleAC(todoListID, title))
    }

    function addTodoList(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

// JSX

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={true}>
                <Grid container={true} style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {
                        todoLists.map(tl => {

                                let tasksForTodoList = tasks[tl.id]

                                if (tl.filter === "active") {
                                    tasksForTodoList = tasks[tl.id].filter(task => !task.isDone)
                                }

                                if (tl.filter === "completed") {
                                    tasksForTodoList = tasks[tl.id].filter(task => task.isDone)
                                }

                                return (
                                    <Grid item>
                                        <Paper elevation={5} style={{padding: '2px 20px 20px 20px'}}>
                                            <ToDoList
                                                key={tl.id}
                                                id={tl.id}
                                                title={tl.title}
                                                tasks={tasksForTodoList}
                                                filter={tl.filter}
                                                removeTask={removeTask}
                                                changeFilter={changeFilter}
                                                addTask={addTask}
                                                changeTaskStatus={changeTaskStatus}
                                                removeTodoList={removeTodoList}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTodoListTitle={changeTodoListTitle}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            }
                        )
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
