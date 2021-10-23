import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {path: '', component: UsersListComponent},
  {path: 'tasks/:id', component: UserTasksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
