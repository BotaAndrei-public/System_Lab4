package StudentRegistrationApplication.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import StudentRegistrationApplication.model.*;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, String> {}

