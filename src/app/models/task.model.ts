export interface GetUserTask{
    description: string;
    id:          number;
    userId:      number;
    state:       TaskState
}

export interface CreateUserTask{
    description: string;
    userId:      number;
    state:       TaskState
}

export enum TaskState{
    done,
    todo
}