using Microsoft.EntityFrameworkCore;
using ClinicManagement.Application.Interfaces;
using ClinicManagement.Application.DTOs;
using ClinicManagement.Domain.Entities;
using ClinicManagement.Infrastructure.Data;

namespace ClinicManagement.Infrastructure.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly ClinicDbContext _context;

        public PatientRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Patient>> GetAllAsync(string? search)
        {
            var query = _context.Patients
                .Include(p => p.Visits)
                .ThenInclude(v => v.Doctor)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(p => p.Name.Contains(search) || p.Contact.Contains(search));

            return await query.ToListAsync();
        }

        public async Task<Patient?> GetByIdAsync(int id)
        {
            return await _context.Patients
                .Include(p => p.Visits)
                .ThenInclude(v => v.Doctor)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task AddAsync(Patient patient) =>
            await _context.Patients.AddAsync(patient);

        public async Task UpdateAsync(Patient patient) =>
            _context.Patients.Update(patient);

        public async Task DeleteAsync(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient != null) _context.Patients.Remove(patient);
        }

        public async Task<bool> SaveChangesAsync() =>
            await _context.SaveChangesAsync() > 0;

        public async Task<IEnumerable<DoctorDto>> GetDoctorsAsync()
        {
            return await _context.Doctors.Select(d => new DoctorDto
            {
                Id = d.Id,
                Name = d.Name,
                Specialization = d.Specialization,
                TotalVisits = d.Visits.Count
            }).ToListAsync();
        }

        public async Task AddVisitAsync(Visit visit) =>
            await _context.Visits.AddAsync(visit);
    }
}