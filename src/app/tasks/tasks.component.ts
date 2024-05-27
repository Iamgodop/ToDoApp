import { TasksCRUDService } from './tasks-crud.service';
import { Component } from '@angular/core';
import { Task} from './tasks';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: Task[] = []
  isAddTaskBlockOpen: boolean = false
  isUpdateBlockOpen: boolean = false
  selectedTask: Task | null = null

  @ViewChild('updateTitleInput') updateTitleInput!: ElementRef;
  @ViewChild('updateDescInput') updateDescInput!: ElementRef;
  @ViewChild('updateDueDateInput') updateDueDateInput!: ElementRef;
  @ViewChild('updatePriorityInput') updatePriorityInput!: ElementRef;

  @ViewChild('addTitleInput') addTitleInput!: ElementRef;
  @ViewChild('addDescInput') addDescInput!: ElementRef;
  @ViewChild('addDueDateInput') addDueDateInput!: ElementRef;
  @ViewChild('addPriorityInput') addPriorityInput!: ElementRef;
  

  constructor(private tasksManager: TasksCRUDService) {
    this.getAllTasks()
  }

  getAllTasks() {

    this.tasksManager.getTasks().subscribe({next: (response) => {
      this.tasks = response.data
    }});
  }

  addTask() {

    const newTask: Task = {
      title: this.addTitleInput.nativeElement.value,
      task_desc: this.addDescInput.nativeElement.value,
      due_date: this.addDueDateInput.nativeElement.value || new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString(),
      priority: this.addPriorityInput.nativeElement.value
    };
    console.log(newTask.due_date)
    this.tasksManager.addTask(newTask).subscribe({next: (response) => {
      this.isAddTaskBlockOpen = false;
      this.getAllTasks();
    }, error: (error) => {
      console.log(error);
      alert("Failed to add new task!");
    }});
  }

  openAddTaskModal() {

    this.isAddTaskBlockOpen = true;
  }

  closeAddTaskModal() {

    this.isAddTaskBlockOpen = false;
  }

  openUpdateModal(task: Task) {

    this.selectedTask = task
    this.isUpdateBlockOpen = true;
  }

  closeUpdateModal() {

    this.isUpdateBlockOpen = false;
  }

  updateTask() {

    const updatedTask = {
      task_id: this.selectedTask!.task_id,
      user_id: this.selectedTask!.user_id,
      created_at: this.selectedTask!.created_at,
      title: this.updateTitleInput.nativeElement.value,
      task_desc: this.updateDescInput.nativeElement.value,
      due_date: this.updateDueDateInput.nativeElement.value,
      priority: this.updatePriorityInput.nativeElement.value
    };

    this.tasksManager.updateTask(updatedTask).subscribe({next: (response) => {
      this.isUpdateBlockOpen = false;
      this.getAllTasks();
    }, error: (error) => {
      console.log(error);
      alert("Failed to update task");
    }});
  }

  deleteTask(task: Task) {

    this.tasksManager.deleteTask(task).subscribe({next: (response) => {
      alert('successfully deleted task.');
      this.getAllTasks();
    }, error: (error) => {
      console.log(error);
      alert("Failed to delete task");
    }})
  }
}