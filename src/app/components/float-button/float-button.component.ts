import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
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

  @Output() deleteSongEmiter = new EventEmitter<any>();
  @Input() add: boolean = false; 

  @Input() editRemoveId: string = ''; 

  faPen = faPen;
  faTrash = faTrash;
  faPlus = faPlus;


  public navigate(url: string, addNew = false) {
    const parsedUrl = addNew ? url : `${url}/${this.editRemoveId}`
    this._router.navigate([parsedUrl])
  }

  public deleteSong() {
    this.deleteSongEmiter.emit()
  }
}
