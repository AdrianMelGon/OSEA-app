import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  HeaderComponent,
  LeftMenuComponent,
  LoadingComponent,
} from './components';
import { CommonModule } from '@angular/common';
import { ApiServiceService, NavigationService} from './services';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    RouterOutlet,
    HeaderComponent,
    LeftMenuComponent,
    LoadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private _apiServiceService: ApiServiceService = inject(ApiServiceService);
  private _navigationService: NavigationService = inject(NavigationService);

  
  public displayLoading: boolean = true;
  title = 'OSEA';

  constructor(private router: Router) {
    this._apiServiceService
    .getLoadingStatus()
    .subscribe((data) => {
      setTimeout(()=> {
        this.displayLoading = data
      },100)
      });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this._navigationService.setUrl(event.url)
      });


  }
}
