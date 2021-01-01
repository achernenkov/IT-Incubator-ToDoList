import React, {useCallback} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
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

    console.log('Перерисовка APP')

// state

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let dispatch = useDispatch()
// function
    // task
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(RemoveTaskAC(taskID, todoListID))
    }, [dispatch, RemoveTaskAC])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch, addTaskAC])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(ChangeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch, ChangeTaskStatusAC])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(ChangeTaskTitleAC(taskID, title, todoListID))
    }, [dispatch, ChangeTaskTitleAC])

    // todolist

    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodolistFilterAC(todoListID, newFilterValue))
    }, [dispatch, ChangeTodolistFilterAC])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))
    }, [dispatch, RemoveTodoListAC])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(todoListID, title))
    }, [dispatch, ChangeTodolistTitleAC])

    const addTodoList = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    }, [dispatch, AddTodolistAC])

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


                            return (
                                <Grid item key={tl.id}>
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
