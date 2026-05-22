using Microsoft.EntityFrameworkCore;
using ClinicManagement.Application.Interfaces;
using ClinicManagement.Domain.Entities;
using ClinicManagement.Infrastructure.Data;

namespace ClinicManagement.Infrastructure.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly ClinicDbContext _context;

        public DoctorRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Doctor>> GetAllAsync() =>
            await _context.Doctors.Include(d => d.Visits).ToListAsync();

        public async Task<Doctor?> GetByIdAsync(int id) =>
            await _context.Doctors.Include(d => d.Visits)
                .FirstOrDefaultAsync(d => d.Id == id);

        public async Task AddAsync(Doctor doctor) =>
            await _context.Doctors.AddAsync(doctor);

        public Task UpdateAsync(Doctor doctor)
        {
            _context.Doctors.Update(doctor);
            return Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor != null) _context.Doctors.Remove(doctor);
        }

        public async Task<bool> SaveChangesAsync() =>
            await _context.SaveChangesAsync() > 0;
    }
}