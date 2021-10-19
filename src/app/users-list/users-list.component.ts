import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { UserService } from '../services/user.service';
import { GetUser } from '../models/user.model';
import { Observable } from 'rxjs/observable';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService, public dialog: MatDialog, ) {}

  displayedColumns = ['id', 'name', 'delete', 'edit'];
  dataSource = new UserDataSource(this.userService);

  ngOnInit(): void {}

  openDialog(): void {
    let dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '600px',
      data: 'Create User'
    });

    dialogRef.componentInstance.event.subscribe((result) => {
      this.userService.createUser(result.data).subscribe(_ => {

        this.dataSource = new UserDataSource(this.userService);
      });
    });
  }
}

export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }

  connect(): Observable<GetUser[]> {
    return this.userService.getUsers();
  }

  disconnect() {}
}
