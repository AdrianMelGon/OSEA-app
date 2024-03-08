import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private http: HttpClient = inject(HttpClient);

  private isLoadingDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)


  private artistsURL = 'http://localhost:3000/artists';
  private songsURL = 'http://localhost:3000/songs';
  private companiesURL = 'http://localhost:3000/companies';

  // constructor(private http: HttpClient) {}

  getLoadingStatus() {
    return this.isLoadingDisplayed$.asObservable();
  }

  setLoadingStatus(value: boolean) {
    this.isLoadingDisplayed$.next(value)
  }

  getArtists(): Observable<any[]> {
    return this.http.get<any[]>(this.artistsURL);
  }

  getSongs(): Observable<any[]> {
    return this.http.get<any[]>(this.songsURL);
  }

  getSongById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.songsURL}/${id}`);
  }


  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.companiesURL);
  }

  createSong(body: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.songsURL}`, body);
  }

  deleteSongById(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.songsURL}/${id}`);
  }

  updateSong(id: string, body: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.songsURL}/${id}`, body);
  }

}
