using Microsoft.EntityFrameworkCore;
using ClinicManagement.Application.Interfaces;
using ClinicManagement.Domain.Entities;
using ClinicManagement.Infrastructure.Data;

namespace ClinicManagement.Infrastructure.Repositories
{
    public class VisitRepository : IVisitRepository
    {
        private readonly ClinicDbContext _context;

        public VisitRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Visit>> GetAllAsync() =>
            await _context.Visits
                .Include(v => v.Patient)
                .Include(v => v.Doctor)
                .ToListAsync();

        public async Task<IEnumerable<Visit>> GetByPatientIdAsync(int patientId) =>
            await _context.Visits
                .Include(v => v.Patient)
                .Include(v => v.Doctor)
                .Where(v => v.PatientId == patientId)
                .ToListAsync();

        public async Task<Visit?> GetByIdAsync(int id) =>
            await _context.Visits
                .Include(v => v.Patient)
                .Include(v => v.Doctor)
                .FirstOrDefaultAsync(v => v.Id == id);

        public async Task AddAsync(Visit visit) =>
            await _context.Visits.AddAsync(visit);

        public Task UpdateAsync(Visit visit)
        {
            _context.Visits.Update(visit);
            return Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var visit = await _context.Visits.FindAsync(id);
            if (visit != null) _context.Visits.Remove(visit);
        }

        public async Task<bool> SaveChangesAsync() =>
            await _context.SaveChangesAsync() > 0;
    }
}