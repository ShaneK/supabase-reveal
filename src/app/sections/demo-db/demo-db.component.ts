import { Component, OnDestroy, OnInit } from '@angular/core';
import { RealtimeSubscription } from '@supabase/supabase-js';
import { SupaClientService } from '../../services/supa-client.service';

@Component({
  selector: 'app-demo-db',
  templateUrl: './demo-db.component.html',
  styleUrls: ['./demo-db.component.css'],
})
export class DemoDbComponent implements OnInit, OnDestroy {
  public backgroundColor: string = '#0000ff';
  public readRow: string = `const { data, error } = await this._supaService
      .client
      .from('sweettesttable')
      .select('data')
      .eq('name', 'background-color');`;
  public subscribeToChanges: string = `this._superService
        .client
        .from('sweettesttable:name=eq.background-color')
        .on('UPDATE', ({'new': newData}) =>
          this._updateBackgroundColor(newData)
        )
        .subscribe();`;
  public updateRow: string = `const { data, error } = await this._supaService
      .client
      .from('sweettesttable')
      .update({ data: '{ "value": "#00ff00" }' })
      .eq('name', 'background-color');`;

  private _subscriptions: RealtimeSubscription[] = [];

  constructor(private _superService: SupaClientService) {}

  public async ngOnInit(): Promise<void> {
    let { data, error } = await this._superService.client
      .from('sweettesttable')
      .select('data')
      .eq('name', 'background-color');

    if (data?.length) {
      this._updateBackgroundColor(data?.[0]);
    }

    this._subscriptions.push(
      this._superService.client
        .from('sweettesttable:name=eq.background-color')
        .on('UPDATE', ({'new': newData}) => {
          console.log('Change received!', newData);
          this._updateBackgroundColor(newData);
        })
        .subscribe()
    );
    console.log('Set up subscription');
  }

  private _updateBackgroundColor(data: { data?: { value?: string } }) {
    this.backgroundColor = data?.data?.value || this.backgroundColor;
    console.warn('New background color', this.backgroundColor);
  }

  public ngOnDestroy() {
    this._subscriptions.forEach(x => x.unsubscribe());
    console.log('Tore down subscription');
  }
}
