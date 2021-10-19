import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './users-list/users-list.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserTasksComponent,
    AddUserModalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    UserService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
