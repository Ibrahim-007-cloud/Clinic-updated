using Microsoft.AspNetCore.Mvc;
using ClinicManagement.Application.Interfaces;
using ClinicManagement.Application.DTOs;
using ClinicManagement.Domain.Entities;

namespace ClinicManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorRepository _repo;

        public DoctorsController(IDoctorRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var doctors = await _repo.GetAllAsync();
            var result = doctors.Select(d => new DoctorDto
            {
                Id = d.Id,
                Name = d.Name,
                Specialization = d.Specialization,
                TotalVisits = d.Visits?.Count ?? 0
            });
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var doctor = await _repo.GetByIdAsync(id);
            if (doctor == null) return NotFound(new { message = "Doctor not found." });
            return Ok(new DoctorDto
            {
                Id = doctor.Id,
                Name = doctor.Name,
                Specialization = doctor.Specialization,
                TotalVisits = doctor.Visits?.Count ?? 0
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DoctorCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var doctor = new Doctor
            {
                Name = dto.Name,
                Specialization = dto.Specialization
            };

            await _repo.AddAsync(doctor);
            await _repo.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = doctor.Id }, doctor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DoctorCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var doctor = await _repo.GetByIdAsync(id);
            if (doctor == null) return NotFound(new { message = "Doctor not found." });

            doctor.Name = dto.Name;
            doctor.Specialization = dto.Specialization;

            await _repo.UpdateAsync(doctor);
            await _repo.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            var success = await _repo.SaveChangesAsync();
            if (!success) return NotFound(new { message = "Doctor not found." });
            return Ok(new { message = "Doctor deleted successfully." });
        }
    }
}