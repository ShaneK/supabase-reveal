import { AfterViewInit, Component } from '@angular/core';
// @ts-ignore
import Reveal from 'reveal.js'
// @ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
// @ts-ignore
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
// @ts-ignore
import Notes from 'reveal.js/plugin/notes/notes.esm.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public code: string = `class Test {
  public static a: string = 'a';

  public run(): void {
    console.log('Hello world!);
  }
}`;

  public ngAfterViewInit(): void {
    let deck = new Reveal({
      plugins: [ Markdown, Highlight, Notes ],
      progress: false,
      hash: true
    })
    deck.initialize();
  }
}
