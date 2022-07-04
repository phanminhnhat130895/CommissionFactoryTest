import { CreateTaskInput } from "../models/createTaskInput";
import { EditTaskInput } from "../models/editTaskInput";
import api from "./base.service"

export const GetListTask = async () => {
    const response = await api.get('tasks/list');
    return response.data;
}

export const GetTask = async (id: number) => {
    const response = await api.get(`tasks/detail?taskId=${id}`);
    return response.data;
}

export const CreateTask = async (input: CreateTaskInput) => {
    const response = await api.post('tasks/create-task', JSON.stringify(input));
    return response.data;
}

export const CompleteTask = async (id: number) => {
    const response = await api.put(`tasks/complete-task?taskId=${id}`);
    return response.data;
}

export const DeleteTask = async (id: number) => {
    const response = await api.delete(`tasks/delete-task?taskId=${id}`);
    return response.data;
}

export const EditTaskDetail = async (input: EditTaskInput) => {
    const response = await api.put('tasks/edit-task-detail', JSON.stringify(input));
    return response.data;
}