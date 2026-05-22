using Microsoft.AspNetCore.Mvc;
using ClinicManagement.Application.Interfaces;
using ClinicManagement.Application.DTOs;
using ClinicManagement.Domain.Entities;

namespace ClinicManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitsController : ControllerBase
    {
        private readonly IVisitRepository _repo;

        public VisitsController(IVisitRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var visits = await _repo.GetAllAsync();
            var result = visits.Select(v => new VisitDto
            {
                Id = v.Id,
                PatientId = v.PatientId,
                PatientName = v.Patient?.Name ?? "Unknown",
                DoctorId = v.DoctorId,
                DoctorName = v.Doctor?.Name ?? "Unknown",
                Problem = v.Problem,
                VisitDate = v.VisitDate
            });
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var visit = await _repo.GetByIdAsync(id);
            if (visit == null) return NotFound(new { message = "Visit not found." });
            return Ok(new VisitDto
            {
                Id = visit.Id,
                PatientId = visit.PatientId,
                PatientName = visit.Patient?.Name ?? "Unknown",
                DoctorId = visit.DoctorId,
                DoctorName = visit.Doctor?.Name ?? "Unknown",
                Problem = visit.Problem,
                VisitDate = visit.VisitDate
            });
        }

        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetByPatient(int patientId)
        {
            var visits = await _repo.GetByPatientIdAsync(patientId);
            var result = visits.Select(v => new VisitDto
            {
                Id = v.Id,
                PatientId = v.PatientId,
                PatientName = v.Patient?.Name ?? "Unknown",
                DoctorId = v.DoctorId,
                DoctorName = v.Doctor?.Name ?? "Unknown",
                Problem = v.Problem,
                VisitDate = v.VisitDate
            });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] VisitCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var visit = new Visit
            {
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                Problem = dto.Problem,
                VisitDate = dto.VisitDate
            };

            await _repo.AddAsync(visit);
            await _repo.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = visit.Id }, visit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] VisitCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var visit = await _repo.GetByIdAsync(id);
            if (visit == null) return NotFound(new { message = "Visit not found." });

            visit.PatientId = dto.PatientId;
            visit.DoctorId = dto.DoctorId;
            visit.Problem = dto.Problem;
            visit.VisitDate = dto.VisitDate;

            await _repo.UpdateAsync(visit);
            await _repo.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            var success = await _repo.SaveChangesAsync();
            if (!success) return NotFound(new { message = "Visit not found." });
            return Ok(new { message = "Visit deleted successfully." });
        }
    }
}