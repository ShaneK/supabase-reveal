import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupaClientService {
  private readonly _client: SupabaseClient;

  constructor() {
    this._client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  public get client(): SupabaseClient {
    return this._client;
  }
}
