package StudentRegistrationApplication.dto;

public class StudentDTO {
    private String sid;
    private String name;
    private String specialization;

    // Constructor gol
    public StudentDTO() {}

    // Constructor cu parametri
    public StudentDTO(String sid, String name, String specialization) {
        this.sid = sid;
        this.name = name;
        this.specialization = specialization;
    }

    // Getters Setters
    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
}
