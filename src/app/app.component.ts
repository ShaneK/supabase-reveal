import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private _wasOnAuth: boolean = false;

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    // Set up reveal
    let deck = new Reveal({
      plugins: [Markdown, Highlight, Notes],
      progress: false,
      hash: true,
    });
    deck.initialize();

    // I don't need to keep track of this subscription since I want
    // it to hang around while the app is open.
    this._route.fragment.subscribe((fragment) => {
      // I'm pretty sure something funky with reveal is happening
      // that's forcing this navigation to not work as expected
      if (fragment === '/9') {
        this._wasOnAuth = true;
      } else if (fragment === null && this._wasOnAuth) {
        this._wasOnAuth = false;
        // Force reveal to go to slide 8 (this isn't a public API method,
        // I had to dig around for it
        deck.slide(9);
      } else {
        this._wasOnAuth = false;
      }
    });
  }
}
