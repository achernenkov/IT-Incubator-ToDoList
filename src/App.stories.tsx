import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import App from "./App";
import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from "./Task";
import ReduxStoreProviderDecoration from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'ToDoList/App',
    components: App,
    decorators:[ReduxStoreProviderDecoration]
} as Meta



const Template: Story = () => {
    return <App />
}

export const AppExample = Template.bind({})
