import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserTask, GetUserTask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<GetUserTask>{
    return this.httpClient.get<GetUserTask>(`${environment.baseUrl}/api/Tasks`);
  }

  
  getTaskById(taskId: string): Observable<GetUserTask>{
    return this.httpClient.get<GetUserTask>(`${environment.baseUrl}/api/Tasks/${taskId}`);
  }
  
  getTasksForUser(userId: string): Observable<GetUserTask[]>{
    return this.httpClient.get<GetUserTask[]>(`${environment.baseUrl}/api/users/${userId}`);
  }

  createTask(task: CreateUserTask): Observable<GetUserTask>{
    return this.httpClient.post<GetUserTask>(`${environment.baseUrl}/api/Tasks`, task);
  }

  updateTask(task: CreateUserTask, id: number): Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/Tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/Tasks/${id}`);
  }


}
