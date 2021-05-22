import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript';
// @ts-ignore
import Reveal from 'reveal.js';
// @ts-ignore
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
// @ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
// @ts-ignore
import Notes from 'reveal.js/plugin/notes/notes.esm.js';


@Injectable({
  providedIn: 'root',
})
export class RevealService {
  public slideTransitioned$: Observable<any> = of();
  public deck: any = null;

  public setup(): void {
    console.warn('SETUP CALLED');
    // Set up reveal
    let deck = new Reveal({
      plugins: [Markdown, Highlight, Notes],
      progress: false,
      hash: true,
    });

    this.slideTransitioned$ = new Observable<any>(observer => {
      deck.on('slidechanged', (event: any) => {
        console.warn('Slide changed called');
        observer.next(event);
      });
    });

    deck.initialize();
    this.deck = deck;
  }

  public goToSlide(x: number, y?: number) {
    // Force reveal to go to slide 8 (this isn't a public API method,
    // I had to dig around for it
    this.deck.slide(x, y);
  }
}
