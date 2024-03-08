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
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
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

  
  public displayLoading: boolean = false;
  title = 'OSEA';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this._navigationService.setUrl(event.url)
      });

    this._apiServiceService
      .getLoadingStatus()
      .subscribe((data) => (this.displayLoading = data));
  }
}
