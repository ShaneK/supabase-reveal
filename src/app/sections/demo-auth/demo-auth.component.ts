import { AfterViewInit, Component, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SupaClientService } from '../../services/supa-client.service';

@Component({
  selector: 'app-demo-auth',
  templateUrl: './demo-auth.component.html',
  styleUrls: ['./demo-auth.component.css'],
})
export class DemoAuthComponent implements OnInit {
  public user$: Observable<User | null>;
  public readonly signInCode: string = `await this._supaService
      .client
      .auth
      .signIn({ provider: 'github' });`;
  public readonly signOutCode: string = `await this._supaService
      .client
      .auth
      .signOut();`;
  public readonly currentUserCode: string = `this._supaService
      .client
      .auth
      .user();`;
  public readonly authCallback: string = `this._supaService
      .client
      .auth
      .onAuthStateChange((event, session) =>
        this.updateUser(session?.user)
      );`;

  constructor(private _supaService: SupaClientService) {
    this.user$ = this._supaService.user$;
  }

  public async ngOnInit(): Promise<void> {}

  public async signIn(): Promise<void> {
    await this._supaService.client.auth.signIn(
      {
        provider: 'github',
      },
      {
        redirectTo: `${environment.url}/login-success`,
      }
    );
  }

  public async signOut(): Promise<void> {
    await this._supaService.client.auth.signOut();
  }
}
