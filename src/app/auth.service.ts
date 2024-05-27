import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environment'
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase: SupabaseClient

  constructor() {

    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }
  
  signUp(pEmail: string, pPassword: string): Observable<any> {
    
    const signUpResponse = this.supabase.auth.signUp({
      email: pEmail,
      password: pPassword
    });

    return from(signUpResponse);
  }
  public signIn(pEmail: string, pPassword: string): Observable<any> {

    const signInResponse = this.supabase.auth.signInWithPassword({
      email: pEmail,
      password: pPassword
    });
    
    return from(signInResponse);
  }

  public setSession(session: any) {
    if (session) {
      sessionStorage.setItem('user_id', session.user.id);
    } else {
      sessionStorage.removeItem('user_id');
    }
  }

  public getSession() {
    if (localStorage.getItem('user_id')) {
      return true;
    }
    else {
      return false;
    }
  }

  signOut(): Observable<any> {
    const response = this.supabase.auth.signOut();
    return from(response)
  }
}