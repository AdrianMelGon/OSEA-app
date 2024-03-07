import { Component, inject } from '@angular/core';
import { ApiServiceService } from './../../services';
import { CardComponent } from './../../components';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss',
})
export class SongsComponent {
  public songs = <any[]>([]);
  // private _apiServiceService: ApiServiceService = inject(ApiServiceService);

  constructor(private _apiServiceService: ApiServiceService) {}

  ngOnInit(): void {
    this._apiServiceService.getSongs().subscribe({
      next: (data) => this.songs = data,
      error: (err) => console.error(err),
    });
  }
}
