package StudentRegistrationApplication.dto;

public class RegistrationRequest {
    private String studentId;
    private String courseId;

    // Constructor gol
    public RegistrationRequest() {}

    // Constructor cu parametri
    public RegistrationRequest(String studentId, String courseId) {
        this.studentId = studentId;
        this.courseId = courseId;
    }

    // Getters/ Setters
    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }
}
