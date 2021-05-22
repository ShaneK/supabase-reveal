import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupaClientService {
  private readonly _client: SupabaseClient;
  public readonly user$: Observable<User | null>;

  constructor() {
    this._client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.user$ = new Observable((observer) => {
      this._client.auth.onAuthStateChange((_, session) => {
        observer.next(session?.user || null);
      });
    });
  }

  public get client(): SupabaseClient {
    return this._client;
  }
}
