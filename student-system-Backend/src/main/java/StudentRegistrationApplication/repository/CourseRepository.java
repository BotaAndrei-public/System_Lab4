package StudentRegistrationApplication.repository;

import StudentRegistrationApplication.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import StudentRegistrationApplication.model.*;

public interface CourseRepository extends JpaRepository<Course, String> {}
