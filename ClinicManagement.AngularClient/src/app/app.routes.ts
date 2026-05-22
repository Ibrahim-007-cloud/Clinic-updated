import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { PatientListComponent } from './components/patient-list/patient-list';
import { PatientFormComponent } from './components/patient-form/patient-form';
import { DoctorListComponent } from './components/doctor-list/doctor-list';
import { DoctorFormComponent } from './components/doctor-form/doctor-form';
import { VisitListComponent } from './components/visit-list/visit-list';
import { VisitFormComponent } from './components/visit-form/visit-form';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/add', component: PatientFormComponent },
  { path: 'patients/edit/:id', component: PatientFormComponent },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/add', component: DoctorFormComponent },
  { path: 'doctors/edit/:id', component: DoctorFormComponent },
  { path: 'visits', component: VisitListComponent },
  { path: 'visits/add', component: VisitFormComponent },
  { path: 'visits/edit/:id', component: VisitFormComponent },
  { path: '**', redirectTo: '' }
];