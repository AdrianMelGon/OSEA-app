import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  HeaderComponent,
  LeftMenuComponent,
  LoadingComponent,
} from './components';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from './services';

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

  public displayLoading: boolean = false;
  title = 'OSEA';

  ngOnInit() {
    this._apiServiceService
      .getLoadingStatus()
      .subscribe((data) => (this.displayLoading = data));
  }
}
