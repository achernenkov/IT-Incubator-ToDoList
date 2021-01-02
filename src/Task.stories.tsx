import React from 'react'
import { Story , Meta} from '@storybook/react/types-6-0'
import Task, {TaskPropsType} from './Task'
import {action} from "@storybook/addon-actions";

export default {
    title: 'ToDoList/Task',
    component: Task
} as Meta


const removeTaskHandler = action('The delete task button was pressed')
const changeTaskStatusHandler = action('Clicked button to change task status')
const changeTaskTitleHandler = action('Clicked button to change task title')

const Template: Story<TaskPropsType> = (props) => {
    return <Task {...props} />
}

const baseArg1 = {
    task: {id: '1', isDone: true, title: 'CSS'},
    removeTask: removeTaskHandler,
    changeTaskStatus: changeTaskStatusHandler,
    changeTaskTitle: changeTaskTitleHandler,
}

const baseArg2 = {
    task: {id: '2', isDone: false, title: 'HTML'},
    removeTask: removeTaskHandler,
    changeTaskStatus: changeTaskStatusHandler,
    changeTaskTitle: changeTaskTitleHandler,
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {...baseArg1}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {...baseArg2}