using System.ComponentModel.DataAnnotations;

namespace ClinicManagement.Application.DTOs
{
    public class VisitDto
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public int DoctorId { get; set; }
        public string DoctorName { get; set; } = string.Empty;
        public string Problem { get; set; } = string.Empty;
        public DateTime VisitDate { get; set; }
    }

    public class VisitCreateDto
    {
        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        [StringLength(500)]
        public string Problem { get; set; } = string.Empty;

        public DateTime VisitDate { get; set; } = DateTime.UtcNow;
    }
}