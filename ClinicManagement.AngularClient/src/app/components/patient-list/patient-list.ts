import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.css'
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  search: string = '';
  errorMessage: string = '';

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients(this.search).subscribe({
      next: (data) => this.patients = data,
      error: () => this.errorMessage = 'Failed to load patients.'
    });
  }

  onSearch(): void {
    this.loadPatients();
  }

  editPatient(id: number): void {
    this.router.navigate(['/patients/edit', id]);
  }

  deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => this.loadPatients(),
        error: () => this.errorMessage = 'Failed to delete patient.'
      });
    }
  }

  addPatient(): void {
    this.router.navigate(['/patients/add']);
  }
}