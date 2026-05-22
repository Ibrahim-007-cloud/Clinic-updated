import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.css'
})
export class PatientFormComponent implements OnInit {
  patient = { name: '', age: 0, gender: '', contact: '' };
  isEdit = false;
  patientId: number = 0;
  errorMessage = '';
  successMessage = '';

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.patientId = +id;
      this.patientService.getPatientById(this.patientId).subscribe({
        next: (data) => {
          this.patient.name = data.name;
          this.patient.age = data.age;
          this.patient.gender = data.gender;
          this.patient.contact = data.contact;
        },
        error: () => this.errorMessage = 'Failed to load patient.'
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.patientService.updatePatient(this.patientId, this.patient).subscribe({
        next: () => this.router.navigate(['/patients']),
        error: () => this.errorMessage = 'Failed to update patient.'
      });
    } else {
      this.patientService.createPatient(this.patient).subscribe({
        next: () => this.router.navigate(['/patients']),
        error: () => this.errorMessage = 'Failed to create patient.'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/patients']);
  }
}