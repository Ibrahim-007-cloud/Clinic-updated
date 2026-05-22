import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { VisitService } from '../../services/visit.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  totalPatients = 0;
  totalDoctors = 0;
  totalVisits = 0;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private visitService: VisitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(p => this.totalPatients = p.length);
    this.doctorService.getDoctors().subscribe(d => this.totalDoctors = d.length);
    this.visitService.getVisits().subscribe(v => this.totalVisits = v.length);
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}