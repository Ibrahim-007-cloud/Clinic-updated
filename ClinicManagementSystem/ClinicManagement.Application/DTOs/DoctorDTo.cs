using System.ComponentModel.DataAnnotations;

namespace ClinicManagement.Application.DTOs
{
    public class DoctorDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public int TotalVisits { get; set; }
    }

    public class DoctorCreateDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Specialization { get; set; } = string.Empty;
    }
}