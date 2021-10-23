export interface GetUserTask{
    description: string;
    id:          number;
    userId:      number;
    taskState:   TaskState
}

export interface CreateUserTask{
    taskId:      number;
    description: string;
    userId:      number;
    taskState:       TaskState
}

export enum TaskState{
    done,
    todo
}