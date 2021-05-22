import { Component, OnDestroy, OnInit } from '@angular/core';
import { RealtimeSubscription } from '@supabase/supabase-js';
// @ts-ignore
import Reveal from 'reveal.js';
import { RevealService } from '../../services/reveal.service';
import { SupaClientService } from '../../services/supa-client.service';

@Component({
  selector: 'app-demo-db',
  templateUrl: './demo-db.component.html',
  styleUrls: ['./demo-db.component.css'],
})
export class DemoDbComponent implements OnInit, OnDestroy {
  private _acceptableColors: string[] = [
    '#181818',
    '#18185c',
    '#044d11',
    '#890101',
  ];
  private _demoInFocus: boolean = false;

  public backgroundColor: string = this._acceptableColors[0];
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

  constructor(
    private _superService: SupaClientService,
    private _reveal: RevealService
  ) {}

  public async ngOnInit(): Promise<void> {
    await this._resetBackgroundColor();
    let { data } = await this._superService.client
      .from('sweettesttable')
      .select('data')
      .eq('name', 'background-color');

    if (data?.length) {
      this._updateBackgroundColor(data?.[0]);
    }

    this._subscriptions.push(
      this._superService.client
        .from('sweettesttable:name=eq.background-color')
        .on('UPDATE', ({ new: newData }) => {
          this._updateBackgroundColor(newData);
        })
        .subscribe()
    );

    this._reveal.slideTransitioned$.subscribe(async ({indexh: slideNumber}) => {
      this._demoInFocus = slideNumber === 5;
      if (!this._demoInFocus && this.backgroundColor !== this._acceptableColors[0]) {
        await this._resetBackgroundColor();
      }
    });
  }

  private _updateBackgroundColor(data: { data?: { value?: string } }) {
    console.log('DATA:', data);
    this.backgroundColor = data?.data?.value || this.backgroundColor;
    console.log('Background color update:', this.backgroundColor);
    if (!this._demoInFocus && this.backgroundColor !== this._acceptableColors[0]) {
      return;
    }

    if (this._acceptableColors.indexOf(this.backgroundColor) === -1) {
      this.backgroundColor = this._acceptableColors[0];
    }

    document.documentElement.style.setProperty(
      '--background-color',
      this.backgroundColor
    );
  }

  public ngOnDestroy() {
    this._subscriptions.forEach((x) => x.unsubscribe());
  }

  private async _resetBackgroundColor(): Promise<void> {
    // Update background color to default background color
    await this._superService.client
      .from('sweettesttable')
      .update({
        data: { value: this._acceptableColors[0] }
      })
      .eq('name', 'background-color');
  }
}
