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

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,
        [
            {id: todoListID1, title: 'What to learn?', filter: "all"},
            {id: todoListID2, title: 'What to buy?', filter: "all"}
        ]
    )

    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todoListID1]: [
            {id: v1(), title: 'HTML/CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'NodeJS', isDone: true},
        ], [todoListID2]: [
            {id: v1(), title: 'Dog', isDone: true},
            {id: v1(), title: 'Cat', isDone: true},
            {id: v1(), title: 'Horse', isDone: false},
            {id: v1(), title: 'Rabbit', isDone: true},
        ]
    })

// function
    // task
    function removeTask(taskID: string, todoListID: string) {
        dispatchTasks(RemoveTaskAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchTasks(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchTasks(ChangeTaskStatusAC(taskID, isDone, todoListID))
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatchTasks(ChangeTaskTitleAC(taskID, title, todoListID))
    }

    // todolist

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatchTodoLists(ChangeTodolistFilterAC(todoListID,newFilterValue ))
    }

    function removeTodoList(todoListID: string) {
        dispatchTodoLists(RemoveTodoListAC(todoListID))
        dispatchTasks(RemoveTodoListAC(todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchTodoLists(ChangeTodolistTitleAC(todoListID, title))
    }

    function addTodoList(title: string) {
        const action = AddTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
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
