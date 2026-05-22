export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  lastProblem?: string;
  assignedDoctor?: string;
  lastVisitDate?: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  totalVisits?: number;
}

export interface Visit {
  id?: number;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  problem: string;
  visitDate?: string;
}