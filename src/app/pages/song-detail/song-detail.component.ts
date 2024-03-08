import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService, NavigationService} from './../../services';
import { FloatButtonComponent } from './../../components';

@Component({
  selector: 'app-song-detail',
  standalone: true,
  imports: [FloatButtonComponent],
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss',
})
export class SongDetailComponent {
  public songId = '';
  public song = <any>null;
  public artists = <any[]>[];

  private _apiServiceService: ApiServiceService = inject(ApiServiceService);
  private _navigationService: NavigationService = inject(NavigationService);


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this._apiServiceService.getArtists().subscribe({
      next: (data) =>
        (this.artists = data.map((artist) => {
          return { id: Number(artist.id), name: artist.name };
        })),
      error: (err) => console.error(err),
    });

    const url = this.route.snapshot.url;
    if (url[url.length - 1].path !== 'edit') {
      this._apiServiceService.setLoadingStatus(true);

      this._apiServiceService.getSongById(url[url.length - 1].path).subscribe({
        next: (data) => {
          this.song = data;
          this.songId = this.song.id.toString();
          const artist = this.artists.find(
            (artist) => artist.id === this.song.artist.toString()
          );
        },
        error: (err) => console.error(err),
        complete: () => this._apiServiceService.setLoadingStatus(false),
      });
    }
  }

  public deleteSong() {
    this._apiServiceService.setLoadingStatus(true);
    this._apiServiceService.deleteSongById(this.songId).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err),
      complete: () => {
        // this._apiServiceService.setLoadingStatus(false)
        this._navigationService.navigate('songs')
      },
    });
  }
}
