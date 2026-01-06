package StudentRegistrationApplication.dto;

public class CourseDTO {
    private String cid;
    private String name;
    private String days;
    private int startTime;
    private int endTime;
    private String instructor;

    // Constructor gol
    public CourseDTO() {}

    // Constructor cu parametri
    public CourseDTO(String cid, String name, String days, int startTime, int endTime, String instructor) {
        this.cid = cid;
        this.name = name;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.instructor = instructor;
    }

    // Getters și Setters
    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDays() {
        return days;
    }

    public void setDays(String days) {
        this.days = days;
    }

    public int getStartTime() {
        return startTime;
    }

    public void setStartTime(int startTime) {
        this.startTime = startTime;
    }

    public int getEndTime() {
        return endTime;
    }

    public void setEndTime(int endTime) {
        this.endTime = endTime;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }
}