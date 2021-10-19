import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser, GetUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<GetUser[]>{
    return this.httpClient.get<GetUser[]>(`${environment.baseUrl}/api/Users`);
  }

  
  getUserById(userId: string): Observable<GetUser>{
    return this.httpClient.get<GetUser>(`${environment.baseUrl}/api/Users`);
  }

  createUser(user: CreateUser): Observable<GetUser>{
    return this.httpClient.post<GetUser>(`${environment.baseUrl}/api/Users`, user);
  }

  updateUser(user: CreateUser, id: number): Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/Users/${id}`, user);
  }

  deleteUser(id: number): Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/Users/${id}`);
  }


}
