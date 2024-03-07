import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent, LeftMenuComponent} from './components'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LeftMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OSEA';
}
