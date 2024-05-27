import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [{
    path: "auth",
    component: HomeComponent
  },{
    path: "tasks",
    component: TasksComponent
  },
  {
    path: "**",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
