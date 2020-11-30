import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {

// state

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoListID1, title: 'What to learn?', filter: "all"},
            {id: todoListID2, title: 'What to buy?', filter: "all"}
        ]
    )

    const [tasks, setTasks] = useState<TaskStateType>({
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

    function removeTask(taskID: string, todoListID: string) {
        const todoListTask = tasks[todoListID]
        tasks[todoListID] = todoListTask.filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TasksType = {id: v1(), title: title, isDone: false}
        // const todoListTask = tasks[todoListID]
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }


    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID] // Просто удаляем данный элемент.
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTask = tasks[todoListID]
        const task: TasksType | undefined = todoListTask.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoListTask = tasks[todoListID]
        const task: TasksType | undefined = todoListTask.find(task => task.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const todoList = todoLists.find(task => task.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        const newTodoListID: string = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
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

export default App;
