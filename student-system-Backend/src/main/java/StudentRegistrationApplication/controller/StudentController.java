// ==========================================
// StudentController.java - COMPLET
// ==========================================
// Locație: src/main/java/StudentRegistrationApplication/controller/StudentController.java

package StudentRegistrationApplication.controller;

import org.springframework.web.bind.annotation.*;
import StudentRegistrationApplication.dto.StudentDTO;
import StudentRegistrationApplication.dto.CourseDTO;
import StudentRegistrationApplication.dto.RegistrationRequest;
import StudentRegistrationApplication.model.Student;
import StudentRegistrationApplication.model.Course;
import StudentRegistrationApplication.service.RegistrationService;
import StudentRegistrationApplication.service.LoggerService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StudentController {

    private final RegistrationService registrationService;
    private final LoggerService loggerService;

    public StudentController(RegistrationService registrationService,
                             LoggerService loggerService) {
        this.registrationService = registrationService;
        this.loggerService = loggerService;
    }

    @GetMapping("/students")
    public List<StudentDTO> getAllStudents(
            @RequestHeader(value = "X-Client-ID", defaultValue = "anonymous") String clientId) {
        loggerService.logActivity(clientId, "GET_ALL_STUDENTS", "Listare studenți");
        return registrationService.getAllStudents().stream()
                .map(this::toStudentDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/courses")
    public List<CourseDTO> getAllCourses(
            @RequestHeader(value = "X-Client-ID", defaultValue = "anonymous") String clientId) {
        loggerService.logActivity(clientId, "GET_ALL_COURSES", "Listare cursuri");
        return registrationService.getAllCourses().stream()
                .map(this::toCourseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/students/{sid}/registered-courses")
    public List<CourseDTO> getRegisteredCourses(
            @PathVariable String sid,
            @RequestHeader(value = "X-Client-ID", defaultValue = "anonymous") String clientId) {
        loggerService.logActivity(clientId, "GET_REGISTERED_COURSES",
                "Student: " + sid);
        Student student = registrationService.getStudent(sid);
        if (student == null) {
            return Collections.emptyList();
        }
        return student.getRegisteredCourses().stream()
                .map(this::toCourseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/students/{sid}/completed-courses")
    public List<String> getCompletedCourses(
            @PathVariable String sid,
            @RequestHeader(value = "X-Client-ID", defaultValue = "anonymous") String clientId) {
        loggerService.logActivity(clientId, "GET_COMPLETED_COURSES",
                "Student: " + sid);
        Student student = registrationService.getStudent(sid);
        return student != null ? student.getCompletedCourses() : Collections.emptyList();
    }

    @GetMapping("/courses/{cid}/registered-students")
    public List<StudentDTO> getRegisteredStudents(
            @PathVariable String cid,
            @RequestHeader(value = "X-Client-ID", defaultValue = "anonymous") String clientId) {
        loggerService.logActivity(clientId, "GET_REGISTERED_STUDENTS",
                "Curs: " + cid);
        Course course = registrationService.getCourse(cid);
        if (course == null) {
            return Collections.emptyList();
        }
        return course.getRegisteredStudents().stream()
                .map(this::toStudentDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/register")
    public Map<String, String> register(
            @RequestBody RegistrationRequest request,
            @RequestHeader(value = "X-Client-ID", defaultValue = "anonymous") String clientId) {
        String result = registrationService.registerStudentToCourse(
                request.getStudentId(),
                request.getCourseId(),
                clientId);
        return Map.of("message", result);
    }

    // Metode helper pentru conversie
    private StudentDTO toStudentDTO(Student s) {
        StudentDTO dto = new StudentDTO();
        dto.setSid(s.getSid());
        dto.setName(s.getName());
        dto.setSpecialization(s.getSpecialization());
        return dto;
    }

    private CourseDTO toCourseDTO(Course c) {
        CourseDTO dto = new CourseDTO();
        dto.setCid(c.getCid());
        dto.setName(c.getName());
        dto.setDays(c.getDays());
        dto.setStartTime(c.getStartTime());
        dto.setEndTime(c.getEndTime());
        dto.setInstructor(c.getInstructor());
        return dto;
    }
}