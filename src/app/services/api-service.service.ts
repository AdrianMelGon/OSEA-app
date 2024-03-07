import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private http: HttpClient = inject(HttpClient);


  private artistsURL = 'http://localhost:3000/artists';
  private songsURL = 'http://localhost:3000/songs';
  private companiesURL = 'http://localhost:3000/companies';

  // constructor(private http: HttpClient) {}

  getArtists(): Observable<any[]> {
    return this.http.get<any[]>(this.artistsURL);
  }

  getSongs(): Observable<any[]> {
    return this.http.get<any[]>(this.songsURL);
  }
  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.companiesURL);
  }
}
