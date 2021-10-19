import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateUser } from '../models/user.model';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {

  user: CreateUser = {
    name: '',
  };
  public event: EventEmitter<any> = new EventEmitter();
  
  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit({data: this.user});
    this.dialogRef.close();
  }

}
