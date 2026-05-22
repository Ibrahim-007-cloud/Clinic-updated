import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/patient';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = 'http://localhost:5227/api/doctors';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  createDoctor(doctor: any): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  updateDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}