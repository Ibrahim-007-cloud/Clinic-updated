import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/patient';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.css'
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  errorMessage = '';

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => this.doctors = data,
      error: () => this.errorMessage = 'Failed to load doctors.'
    });
  }

  addDoctor(): void {
    this.router.navigate(['/doctors/add']);
  }

  editDoctor(id: number): void {
    this.router.navigate(['/doctors/edit', id]);
  }

  deleteDoctor(id: number): void {
    if (confirm('Delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => this.loadDoctors(),
        error: () => this.errorMessage = 'Failed to delete doctor.'
      });
    }
  }
}