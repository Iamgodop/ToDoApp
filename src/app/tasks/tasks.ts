export interface Task {
    task_id?: number;
    user_id?: string;
    created_at?: Date;
    title: string;
    task_desc: string;
    priority: number;
    due_date?: Date;
}