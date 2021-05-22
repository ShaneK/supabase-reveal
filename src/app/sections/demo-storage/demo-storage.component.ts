import { Component } from '@angular/core';
import { SupaClientService } from '../../services/supa-client.service';

@Component({
  selector: 'app-demo-storage',
  templateUrl: './demo-storage.component.html',
  styleUrls: ['./demo-storage.component.css'],
})
export class DemoStorageComponent {
  public downloadLink: string = '';

  constructor(
    private _supaService: SupaClientService
  ) {}

  public async uploadFile($event: any): Promise<void> {
    const file = $event.target.files?.[0];
    if (!file) {
      return;
    }

    const randomNumberStr = Math.random() * 1000000;
    const fileName = `uploaded_${randomNumberStr}_${
      file?.name || 'Unknown.png'
    }`;
    const { data, error } = await this._supaService.client.storage
      .from('test')
      .upload(fileName, file);

    if (error) {
      console.error('ERR:', error);
      return;
    }

    const { data: downloadUrl, error: newError } =
      await this._supaService.client.storage
        .from('test')
        .createSignedUrl(fileName, 1500);

    this.downloadLink = downloadUrl?.signedURL || '';
  }
}
