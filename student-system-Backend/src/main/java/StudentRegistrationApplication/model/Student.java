package StudentRegistrationApplication.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Entity
@Data
public class Student {
    @Id
    private String sid;
    private String name;
    private String specialization;

    @ElementCollection
    @CollectionTable(name = "student_completed_courses")
    @Column(name = "course_id")
    private List<String> completedCourses = new ArrayList<>();

    @ManyToMany
    @JoinTable(
                name = "student_registrations",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> registeredCourses = new ArrayList<>();

    // Constructori
    public Student() {}

    public Student(String sid, String name, String specialization) {
        this.sid = sid;
        this.name = name;
        this.specialization = specialization;
    }

    // Getters și Setters
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

    public List<String> getCompletedCourses() {
        return completedCourses;
    }

    public void setCompletedCourses(List<String> completedCourses) {
        this.completedCourses = completedCourses;
    }

    public List<Course> getRegisteredCourses() {
        return registeredCourses;
    }

    public void setRegisteredCourses(List<Course> registeredCourses) {
        this.registeredCourses = registeredCourses;
    }
}