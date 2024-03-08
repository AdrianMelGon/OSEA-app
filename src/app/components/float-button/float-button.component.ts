import { Component, Input, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-float-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './float-button.component.html',
  styleUrl: './float-button.component.scss'
})
export class FloatButtonComponent {
  public  _router: Router = inject(Router)


  @Input() add: boolean = false; 

  @Input() editRemove: boolean = false; 

  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;


  public navigate(url: string) {
    this._router.navigate([url])
  }
}
