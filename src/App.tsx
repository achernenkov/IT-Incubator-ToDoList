import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

// Comment

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

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>(
        [
            {id: todoListID1, title: 'What to learn?', filter: "all" },
            {id: todoListID2, title: 'What to buy?', filter: "all" }
        ]

    )

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML/CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redax', isDone: true},
        ],[todoListID2]: [
            {id: v1(), title: 'Dog', isDone: true},
            {id: v1(), title: 'Cat', isDone: true},
            {id: v1(), title: 'Horse', isDone: false},
            {id: v1(), title: 'Rabbit', isDone: true},
        ]
    })



    // const [tasks, setTasks] = useState<Array<TasksType>>([
    //     {id:v1(), title:'HTML/CSS', isDone: true},
    //     {id:v1(), title:'JavaScript', isDone: true},
    //     {id:v1(), title:'React', isDone: false},
    //     {id:v1(), title:'Redax', isDone: true},
    //     {id:v1(), title:'SaSS', isDone: false}
    // ])
    //
    // const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskID: string, todoListID: string){
        const todoListTask = tasks[todoListID]
        tasks[todoListID] = todoListTask.filter(task => task.id !== taskID) // Если true - то попадает в новый массив.
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string){
        const newTask: TasksType = {id: v1(), title: title, isDone: false}
        // const todoListTask = tasks[todoListID]
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }


    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList){
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
       setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID] // Просто удаляем данный элемент.
        setTasks({...tasks})
    }

    // let tasksForTodoList = tasks
    // if(filter === "active"){
    //     tasksForTodoList = tasks.filter(task => task.isDone === false)
    // }
    // if(filter === "completed"){
    //     tasksForTodoList = tasks.filter(task => task.isDone === true)
    // }

    function changeTaskStatus(taskID:string, isDone: boolean, todoListID: string){
        const todoListTask = tasks[todoListID]
        const task: TasksType | undefined = todoListTask.find(task => task.id === taskID)
        if(task){
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">

            {
                todoLists.map(tl => {

                    let tasksForTodoList = tasks[tl.id]

                    if(tl.filter === "active"){
                        tasksForTodoList = tasks[tl.id].filter(task => task.isDone === false)
                    }

                    if(tl.filter === "completed"){
                        tasksForTodoList = tasks[tl.id].filter(task => task.isDone === true)
                    }

                    return(
                    <ToDoList
                        key = {tl.id}
                        id = {tl.id}
                        title = {tl.title}
                        tasks={tasksForTodoList}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                    />
                    )
                    }

                )
            }

        </div>
    );
}

export default App;
