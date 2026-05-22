import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VisitService } from '../../services/visit.service';
import { Visit } from '../../models/patient';

@Component({
  selector: 'app-visit-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-list.component.html',
  styleUrl: './visit-list.css'
})
export class VisitListComponent implements OnInit {
  visits: Visit[] = [];
  errorMessage = '';

  constructor(private visitService: VisitService, private router: Router) {}

  ngOnInit(): void {
    this.loadVisits();
  }

  loadVisits(): void {
    this.visitService.getVisits().subscribe({
      next: (data) => this.visits = data,
      error: () => this.errorMessage = 'Failed to load visits.'
    });
  }

  addVisit(): void {
    this.router.navigate(['/visits/add']);
  }

  editVisit(id: number): void {
    this.router.navigate(['/visits/edit', id]);
  }

  deleteVisit(id: number): void {
    if (confirm('Delete this visit?')) {
      this.visitService.deleteVisit(id).subscribe({
        next: () => this.loadVisits(),
        error: () => this.errorMessage = 'Failed to delete visit.'
      });
    }
  }
}