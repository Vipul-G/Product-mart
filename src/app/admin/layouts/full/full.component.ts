import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {AppState} from '../../../ngrx/types';
import User from 'src/app/types/user';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { NavigationStart, Router, Event, ChildActivationStart } from '@angular/router';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: []
})
export class FullComponent implements OnInit, OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  adminState: User;
  subscriptions: Subscription[] = []

  private event$
  private currentUrl: string = ''
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public menuItems: MenuItems,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    const sub = this.store.select((state: AppState) => state.userState).subscribe((adminState) => {
      this.adminState = adminState;
    })
    this.subscriptions.push(sub)

    this.event$
    =this.router.events
    .subscribe((event) => {
      if(event instanceof NavigationStart) {
        console.log('[Navigation]:', event.url)
        this.currentUrl = event.url;
      }
    });
  }

  refresh() {
    this.router.navigateByUrl(this.currentUrl)
    .then((v) => { console.log('[Navigation]:', v) })
    .catch((reason) => { console.log('[Navigation] false:', reason) })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscriptions.forEach(sub => sub.unsubscribe())
    this.event$.unsubscribe();
  }
  ngAfterViewInit() {}
}
