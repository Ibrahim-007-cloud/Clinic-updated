using ClinicManagement.Domain.Entities;

namespace ClinicManagement.Application.Interfaces
{
    public interface IVisitRepository
    {
        Task<IEnumerable<Visit>> GetAllAsync();
        Task<IEnumerable<Visit>> GetByPatientIdAsync(int patientId);
        Task<Visit?> GetByIdAsync(int id);
        Task AddAsync(Visit visit);
        Task UpdateAsync(Visit visit);
        Task DeleteAsync(int id);
        Task<bool> SaveChangesAsync();
    }
}