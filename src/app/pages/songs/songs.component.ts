import { Component } from '@angular/core';
import { ApiServiceService } from './../../services';
import { CardComponent, FloatButtonComponent } from './../../components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, CardComponent, FloatButtonComponent],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss',
})
export class SongsComponent {
  public songs = <any[]>[];
  constructor(private _apiServiceService: ApiServiceService) {}
  ngOnInit(): void {
    this._apiServiceService.setLoadingStatus(true);
    this._apiServiceService.getSongs().subscribe({
      next: (data) => (this.songs = data),
      error: (err) => console.error(err),
      complete: () => this._apiServiceService.setLoadingStatus(false),
    });
  }
}
