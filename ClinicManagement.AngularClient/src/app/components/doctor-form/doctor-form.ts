import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.css'
})
export class DoctorFormComponent implements OnInit {
  doctor = { name: '', specialization: '' };
  isEdit = false;
  doctorId: number = 0;
  errorMessage = '';

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.doctorId = +id;
      this.doctorService.getDoctorById(this.doctorId).subscribe({
        next: (data) => {
          this.doctor.name = data.name;
          this.doctor.specialization = data.specialization;
        },
        error: () => this.errorMessage = 'Failed to load doctor.'
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.doctorService.updateDoctor(this.doctorId, this.doctor).subscribe({
        next: () => this.router.navigate(['/doctors']),
        error: () => this.errorMessage = 'Failed to update doctor.'
      });
    } else {
      this.doctorService.createDoctor(this.doctor).subscribe({
        next: () => this.router.navigate(['/doctors']),
        error: () => this.errorMessage = 'Failed to create doctor.'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/doctors']);
  }
}