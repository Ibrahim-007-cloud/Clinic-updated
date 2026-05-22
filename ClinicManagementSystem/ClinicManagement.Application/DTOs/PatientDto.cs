using System.ComponentModel.DataAnnotations;

namespace ClinicManagement.Application.DTOs
{
    public class PatientDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Contact { get; set; } = string.Empty;
        public string? LastProblem { get; set; }
        public string? AssignedDoctor { get; set; }
        public DateTime? LastVisitDate { get; set; }
    }

    public class PatientCreateDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(1, 150)]
        public int Age { get; set; }

        [Required]
        public string Gender { get; set; } = string.Empty;

        [Required]
        public string Contact { get; set; } = string.Empty;
    }
}