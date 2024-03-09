import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public _router: Router = inject(Router);
  private currentUrl$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  getUrl() {
    return this.currentUrl$.asObservable();
  }

  setUrl(value: string) {
    this.currentUrl$.next(value);
  }

  navigate(url: string) {
    this.setUrl(url);
    this._router.navigate([url]);
  }
}
