import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  private isMenuDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  getMenuStatus() {
    return this.isMenuDisplayed$.asObservable();
  }

  setMenuStatus(value: boolean) {
    this.isMenuDisplayed$.next(value)
  }




}
