import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUserTask } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {
  [x: string]: any;

  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public taskService: TaskService
  ) {
  }

  task: CreateUserTask = {
    description: this.data?.task?.description,
    userId: this.data?.task?.userId,
    taskState: this.data?.task?.taskState,
    taskId: 0
  };
  
  public event: EventEmitter<any> = new EventEmitter();
  
  ngOnInit(): void {
    console.log(this.task)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit({data: this.task});
    this.dialogRef.close();
  }

}