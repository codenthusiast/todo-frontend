import { GetUserTask } from "./task.model";

export interface GetUser {
    name:  string;
    id:    number;
    tasks: GetUserTask[];
}

export interface CreateUser{
    name: string;
}