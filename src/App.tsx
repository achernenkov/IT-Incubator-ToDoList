import React, {useCallback, useEffect} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    changeTodolistFilterAC, changeTodoListTitleTC, createTodoListTC, deleteTodoListTC, fetchTodolistsTC
} from "./state/todolists-reducer";
import {
    addTaskAC,
    addTaskTS,
    changeTaskStatusAC, changeTaskStatusTS,
    changeTaskTitleAC,
    renameTaskTS
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType, todolistsAPI} from "./api/todolists-api";

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
    [key: string]: Array<TaskType>
}

const App: React.FC = () => {
// state

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let dispatch = useDispatch()
// function
    // task
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTS(todoListID, title))
    }, [dispatch, addTaskAC])

    const changeTaskStatus = useCallback((taskID: string, isDone: TaskStatuses, todoListID: string) => {
        dispatch(changeTaskStatusTS(todoListID, taskID, isDone))
    }, [dispatch, changeTaskStatusAC])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(renameTaskTS(todoListID, taskID, title))
    }, [dispatch, changeTaskTitleAC])

    // todolist

    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, newFilterValue))
    }, [dispatch, changeTodolistFilterAC])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodoListTC(todoListID))
    }, [dispatch, deleteTodoListTC])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleTC(title, todoListID))
    }, [dispatch, changeTodoListTitleTC])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [dispatch, createTodoListTC])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

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
                                    <Grid item>
                                        <Paper elevation={5} style={{padding: '2px 20px 20px 20px'}}>
                                            <ToDoList
                                                id={tl.id}
                                                title={tl.title}
                                                tasks={tasksForTodoList}
                                                filter={tl.filter}
                                                changeFilter={changeFilter}
                                                _addTask={addTask}
                                                changeTaskStatus={changeTaskStatus}
                                                _removeTodoList={removeTodoList}
                                                changeTaskTitle={changeTaskTitle}
                                                _changeTodoListTitle={changeTodoListTitle}
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

export default App;
