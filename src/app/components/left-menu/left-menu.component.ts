import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuServiceService } from './../../services';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss',
})
export class LeftMenuComponent {
  private _menuServiceService: MenuServiceService = inject(MenuServiceService);
  public  _router: Router = inject(Router)
  faXmark = faXmark;
  faArrowRight = faArrowRight;

  public displayMenu: boolean = false;

  public sections = [
    {
      label: 'Artists',
      url: '/artists'
    },
    {
      label: 'Songs',
      url: '/songs'
    },
    {
      label: 'Companies',
      url: '/companies'
    }
  ]

  ngOnInit() {
    this._menuServiceService
      .getMenuStatus()
      .subscribe((data) => (this.displayMenu = data));
  }

  navigate(url: string) {

    this._router.navigate([url])
    this._menuServiceService.setMenuStatus(false);

  }

  closeModal() {
    this._menuServiceService.setMenuStatus(false);
  }
}
