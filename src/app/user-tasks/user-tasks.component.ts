import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/observable';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { CreateUserTask, GetUserTask } from '../models/task.model';
import { GetUser } from '../models/user.model';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit {
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  displayedColumns = ['id', 'description', 'state', 'action'];
  userId: any = this.route.snapshot.paramMap.get('id')!;
  dataSource = new TaskDataSource(this.userService, this.userId);
  selectedTaskId: number = 0;

  ngOnInit(): void {
  }

  openDialog(type: string, task: GetUserTask | null): void {
    let dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '600px',
      data: {
        title: type === 'edit'? 'Edit task': 'Create Task',
        type,
        task
      },

    });

    dialogRef.componentInstance.event.subscribe((result: { data: CreateUserTask; }) => {
      console.log(result)
      result.data.userId = parseInt(this.userId);
      if(type === 'edit'){

        this.taskService.updateTask(result.data, this.selectedTaskId).subscribe((_) => {
          this.dataSource = new TaskDataSource(this.userService, this.userId);
        });
      }else{
        
        this.taskService.createTask(result.data).subscribe((_) => {
          this.dataSource = new TaskDataSource(this.userService, this.userId);
        });
      }
    });
  }

  deleteTask(taskId: number): void {
            
    this.taskService.deleteTask(taskId).subscribe((_) => {
      this.dataSource = new TaskDataSource(this.userService, this.userId);
    });
  }
  editTask(task: GetUserTask): void {
    this.selectedTaskId = task.id;
    this.openDialog('edit', task);
  }
}

export class TaskDataSource extends DataSource<any> {
  constructor(private userService: UserService, public userId: number) {
    super();
  }

  connect(): Observable<GetUserTask[]> {
    return this.userService.getUserById(this.userId).map((data) => data.tasks);
  }

  disconnect() {}
}
