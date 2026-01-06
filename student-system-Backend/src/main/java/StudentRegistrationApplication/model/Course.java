package StudentRegistrationApplication.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Course {
    @Id
    private String cid;
    private String name;
    private String days;
    private int startTime;
    private int endTime;
    private String instructor;

    @ManyToMany(mappedBy = "registeredCourses")
    private List<Student> registeredStudents = new ArrayList<>();

    // Constructori
    public Course() {}

    public Course(String cid, String name, String days, int startTime, int endTime, String instructor) {
        this.cid = cid;
        this.name = name;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.instructor = instructor;
    }

    // Metoda conflicts
    public boolean conflicts(Course other) {
        if (this.cid.equals(other.cid)) return true;

        for (char day : this.days.toCharArray()) {
            if (other.days.indexOf(day) != -1) {
                return (this.startTime <= other.startTime && other.startTime < this.endTime)
                        || (other.startTime <= this.startTime && this.startTime < other.endTime);
            }
        }
        return false;
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

    public List<Student> getRegisteredStudents() {
        return registeredStudents;
    }

    public void setRegisteredStudents(List<Student> registeredStudents) {
        this.registeredStudents = registeredStudents;
    }
}
