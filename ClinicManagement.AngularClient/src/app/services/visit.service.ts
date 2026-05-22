import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visit } from '../models/patient';

@Injectable({ providedIn: 'root' })
export class VisitService {
  private apiUrl = 'http://localhost:5227/api/visits';

  constructor(private http: HttpClient) {}

  getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.apiUrl);
  }

  getVisitsByPatient(patientId: number): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  getVisitById(id: number): Observable<Visit> {
    return this.http.get<Visit>(`${this.apiUrl}/${id}`);
  }

  createVisit(visit: any): Observable<any> {
    return this.http.post(this.apiUrl, visit);
  }

  updateVisit(id: number, visit: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, visit);
  }

  deleteVisit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}