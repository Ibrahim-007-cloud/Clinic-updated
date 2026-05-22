import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisitService } from '../../services/visit.service';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { Doctor, Patient } from '../../models/patient';

@Component({
  selector: 'app-visit-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visit-form.component.html',
  styleUrl: './visit-form.css'
})
export class VisitFormComponent implements OnInit {
  visit = { patientId: 0, doctorId: 0, problem: '', visitDate: '' };
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  isEdit = false;
  visitId: number = 0;
  errorMessage = '';

  constructor(
    private visitService: VisitService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe(d => this.doctors = d);
    this.patientService.getPatients().subscribe(p => this.patients = p);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.visitId = +id;
      this.visitService.getVisitById(this.visitId).subscribe({
        next: (data) => {
          this.visit.patientId = data.patientId;
          this.visit.doctorId = data.doctorId;
          this.visit.problem = data.problem;
          this.visit.visitDate = data.visitDate ?? '';
        },
        error: () => this.errorMessage = 'Failed to load visit.'
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.visitService.updateVisit(this.visitId, this.visit).subscribe({
        next: () => this.router.navigate(['/visits']),
        error: () => this.errorMessage = 'Failed to update visit.'
      });
    } else {
      this.visitService.createVisit(this.visit).subscribe({
        next: () => this.router.navigate(['/visits']),
        error: () => this.errorMessage = 'Failed to create visit.'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/visits']);
  }
}