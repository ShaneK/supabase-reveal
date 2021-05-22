import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RevealService } from './services/reveal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private _wasOnAuth: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _reveal: RevealService
  ) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this._reveal.setup();

    // I don't need to keep track of this subscription since I want
    // it to hang around while the app is open.
    this._route.fragment.subscribe((fragment) => {
      // I'm pretty sure something funky with reveal is happening
      // that's forcing this navigation to not work as expected
      if (fragment === '/9') {
        this._wasOnAuth = true;
      } else if (fragment === null && this._wasOnAuth) {
        this._wasOnAuth = false;
        this._reveal.goToSlide(9);
      } else {
        this._wasOnAuth = false;
      }
    });
  }
}
