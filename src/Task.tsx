import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React from "react";

type TaskPropsType = {

}

const Task: React.FC<TaskPropsType> = React.memo(({}) => {
    return(
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                size={"small"}
                color={"primary"}
                checked={task.isDone}
                onChange={(e) => {
                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                }}
            />

            <EditableSpan
                title={task.title}
                changeValue={changeTaskTitle}
            />
            <IconButton onClick={() => {
                props.removeTask(task.id, props.id)
            }}>
                <Delete/>
            </IconButton>
        </div>
    )
})

export default Task;