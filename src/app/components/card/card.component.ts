import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public  _router: Router = inject(Router)

  @Input() item: any; 

  ngOnChanges() {
    console.log(this.item)
  }

  
  navigate(url: string) {
    this._router.navigate([`songs/${url}`])
  }
}
