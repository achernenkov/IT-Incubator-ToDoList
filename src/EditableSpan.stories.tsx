import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import EditableSpan, {EditableSpanType} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from "./Task";

export default {
    title: 'ToDoList/EditableSpan',
    components: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Changed value editable span'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value to editable span'
        },
    }
} as Meta



const Template: Story<EditableSpanType> = (props) => {
    return <EditableSpan {...props} />
}

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    changeValue: action('Value changed'),
    title: 'Testing Value, double click please'
}