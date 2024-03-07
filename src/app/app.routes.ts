import { Routes } from '@angular/router';
import { ArtistsComponent, CompaniesComponent, SongsComponent } from './pages';


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
        component: SongsComponent,
    }
]
