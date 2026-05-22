using ClinicManagement.Domain.Entities;
using ClinicManagement.Application.DTOs;

namespace ClinicManagement.Application.Interfaces
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetAllAsync(string? search);
        Task<Patient?> GetByIdAsync(int id);
        Task AddAsync(Patient patient);
        Task UpdateAsync(Patient patient);
        Task DeleteAsync(int id);
        Task<bool> SaveChangesAsync();
        Task<IEnumerable<DoctorDto>> GetDoctorsAsync();
        Task AddVisitAsync(Visit visit);
    }
}