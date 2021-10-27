import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { UserService } from '../services/user.service';
import { CreateUser, GetUser } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserService, public dialog: MatDialog, ) {}

  selectedUser: number = 0;
  displayedColumns = ['id', 'name', 'action'];
  dataSource = new UserDataSource(this.userService);

  ngOnInit(): void {}

  openDialog(type: string, user: GetUser | null): void {
    let dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '600px',
      data: {
        title: type === 'edit'? 'Edit user' : 'Create user',
        user: user
      }
    });

    dialogRef.componentInstance.event.subscribe((result) => {
      if(type === 'edit'){

        this.userService.updateUser(result.data, this.selectedUser).subscribe(_ => {
          this.dataSource = new UserDataSource(this.userService);
        });
      }else{
        this.userService.createUser(result.data).subscribe(_ => {
          this.dataSource = new UserDataSource(this.userService);
        });
      }
    });
  }

  deleteUser(id: number): void{
    this.userService.deleteUser(id).subscribe(_ => {
      this.dataSource = new UserDataSource(this.userService);
    });
  }

  editUser(user: GetUser): void{
    this.selectedUser = user.id;
    this.openDialog('edit', user)
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
