import { Routes } from '@angular/router';
import {
  ArtistsComponent,
  CompaniesComponent,
  SongsComponent,
  SongDetailComponent,
  SongEditComponent
} from './pages';

export const routes: Routes = [
  {
    path: 'artists',
    component: ArtistsComponent,
  },
  {
    path: 'companies',
    component: CompaniesComponent,
  },
  {
    path: 'songs',
    // component: SongsComponent,
    children: [
        {
            path: '',
            component: SongsComponent,
          },
          {
            path: 'edit/:id',
            component: SongEditComponent,
          },
          {
            path: 'edit',
            component: SongEditComponent,
          },
        {
            path: ':id',
            component: SongDetailComponent,
          },
    ]
  },
];
