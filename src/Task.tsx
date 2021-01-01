import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React from "react";
import {TasksType} from "./AppWithReducers";

type TaskPropsType = {
    task: TasksType
    removeTaskHandler: (taskID: string) => void
    changeTaskStatusHandler: (taskID: string, isDone: boolean) => void
    changeTaskTitleHandler: (taskID: string, newValue: string) => void
}

const Task: React.FC<TaskPropsType> = React.memo(({task, removeTaskHandler, changeTaskStatusHandler,changeTaskTitleHandler}) => {
    return(
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                size={"small"}
                color={"primary"}
                checked={task.isDone}
                onChange={(e) => {
                    changeTaskStatusHandler(task.id, e.currentTarget.checked)
                }}
            />

            <EditableSpan
                title={task.title}
                changeValue={(newValue: string) => changeTaskTitleHandler(task.id, newValue)}
            />
            <IconButton onClick={() => {
                removeTaskHandler(task.id)
            }}>
                <Delete/>
            </IconButton>
        </div>
    )
})

export default Task;