import { Component, inject } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceService } from './../../services';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-song-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
  ],
  providers: [],
  templateUrl: './song-edit.component.html',
  styleUrl: './song-edit.component.scss',
})
export class SongEditComponent {
  private _apiServiceService: ApiServiceService = inject(ApiServiceService);
  public artists = <any[]>[];
  public song = <any>null;
  newGenres: string[] = [];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      year: [0, Validators.required],
      rating: [0, Validators.required],
      duration: [0, Validators.required],
      artist: [0, Validators.required],
      newGenre: [''],
    });
  }

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
          const artist = this.artists.find(
            (artist) => artist.id === this.song.artist
          );

          this.form.patchValue({
            title: this.song.title,
            year: this.song.year,
            rating: this.song.rating,
            duration: this.song.duration,
            artist: artist.name,
          });

          this.newGenres = this.song.genre;
        },
        error: (err) => console.error(err),
        complete: () => this._apiServiceService.setLoadingStatus(false),
      });
    }
    console.log(this.artists);
    this.cdr.detectChanges();
  }

  addNewGenre() {
    const newGenre = this.form.get('newGenre')?.value;
    if (newGenre) {
      this.newGenres.push(newGenre);
      this.form.get('newGenre')?.reset();
    }
  }

  deleteValue(index: number) {
    this.newGenres.splice(index, 1);
    console.log(this.artists);
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      let body = this.form.value;
      delete body.newGenre;
      body.genre = this.newGenres;
      this._apiServiceService.setLoadingStatus(true);
      if (this.song) {
        //Update song
        this._apiServiceService.updateSong(this.song.id, body).subscribe({
          next: (resp) => console.log(resp),
          error: (err) => console.log(err),
          complete: () => this._apiServiceService.setLoadingStatus(false),
        });
      } else {
        //Create song
        this._apiServiceService.createSong(body).subscribe({
          next: (resp) => console.log(resp),
          error: (err) => console.log(err),
          complete: () => this._apiServiceService.setLoadingStatus(false),
        });
      }
    } else {
      //Todo
    }
  }
}
