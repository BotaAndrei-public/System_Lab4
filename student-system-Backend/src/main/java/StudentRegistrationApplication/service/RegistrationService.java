package StudentRegistrationApplication.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import StudentRegistrationApplication.model.*;
import StudentRegistrationApplication.repository.*;

import java.util.*;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class RegistrationService {

    private final StudentRepository studentRepo;
    private final CourseRepository courseRepo;
    private final LoggerService loggerService;

    // Lock pentru excludere mutuală
    private final ReentrantLock registrationLock = new ReentrantLock();

    public RegistrationService(StudentRepository studentRepo,
                               CourseRepository courseRepo,
                               LoggerService loggerService) {
        this.studentRepo = studentRepo;
        this.courseRepo = courseRepo;
        this.loggerService = loggerService;
    }

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public Student getStudent(String sid) {
        return studentRepo.findById(sid).orElse(null);
    }

    public Course getCourse(String cid) {
        return courseRepo.findById(cid).orElse(null);
    }

    @Transactional
    public String registerStudentToCourse(String sid, String cid, String clientId) {
        registrationLock.lock();
        try {
            Student student = studentRepo.findById(sid).orElse(null);
            Course course = courseRepo.findById(cid).orElse(null);

            if (student == null) {
                loggerService.logActivity(clientId, "REGISTER_FAILED",
                        "Student " + sid + " nu există");
                return "ID student inexistent";
            }

            if (course == null) {
                loggerService.logActivity(clientId, "REGISTER_FAILED",
                        "Curs " + cid + " nu există");
                return "ID curs inexistent";
            }

            // Verificare conflicte
            for (Course registeredCourse : student.getRegisteredCourses()) {
                if (registeredCourse.conflicts(course)) {
                    loggerService.logActivity(clientId, "REGISTER_FAILED",
                            "Conflict: " + sid + " -> " + cid);
                    return "Conflicte de înregistrare la curs";
                }
            }

            // Înregistrare
            student.getRegisteredCourses().add(course);
            course.getRegisteredStudents().add(student);

            studentRepo.save(student);
            courseRepo.save(course);

            loggerService.logActivity(clientId, "REGISTER_SUCCESS",
                    sid + " înregistrat la " + cid);

            return "Succes!";

        } finally {
            registrationLock.unlock();
        }
    }
}