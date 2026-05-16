import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuranService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.alquran.cloud/v1';

  getSurahs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/surah`);
  }

  getSurah(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/surah/${id}`);
  }
}
