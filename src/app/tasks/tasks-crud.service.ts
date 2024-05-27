import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from "../../../environment"
import { Task } from './tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksCRUDService {

  supabase: SupabaseClient

  constructor(private router: Router) { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  getTasks(): Observable<any> {
    
    const userId = localStorage.getItem('user_id');
    if (!userId) this.router.navigate(["/auth"]);

    const tasksResponse = this.supabase
      .from('Tasks')
      .select('*')
      .eq('user_id', localStorage.getItem('user_id'))

    return from(tasksResponse);
  }

  addTask(task: Task): Observable<any> {

    const userId = localStorage.getItem('user_id');
    if (!userId) this.router.navigate(['/auth']);

    const response = this.supabase
      .from('Tasks')
      .insert({
        user_id: userId,
        title: task.title,
        task_desc: task.task_desc,
        priority: task.priority || 3,
        due_date: task.due_date
      });

    return from(response);
  }

  updateTask(updatedTask: Task): Observable<any> {

    const response = this.supabase.
    from('Tasks')
    .update({
      title: updatedTask.title,
      task_desc: updatedTask.task_desc,
      priority: updatedTask.priority,
      due_date: updatedTask.due_date,
    })
    .eq('user_id', updatedTask.user_id)
    .eq('task_id', updatedTask.task_id)

    return from(response)
  }

  deleteTask(task: Task): Observable<any> {

    const response = this.supabase
    .from('Tasks')
    .delete()
    .eq('user_id', task.user_id)
    .eq('task_id', task.task_id)

    return from(response)
  }
}
