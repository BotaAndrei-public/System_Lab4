package StudentRegistrationApplication.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import StudentRegistrationApplication.model.ActivityLog;
import StudentRegistrationApplication.repository.ActivityLogRepository;

import java.io.*;
import java.time.format.DateTimeFormatter;

@Service
public class LoggerService {

    private final ActivityLogRepository logRepository;
    private static final String LOG_FILE = "activity_log.txt";
    private static final DateTimeFormatter formatter =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public LoggerService(ActivityLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Async
    public void logActivity(String clientId, String commandType, String details) {
        ActivityLog log = new ActivityLog(clientId, commandType, details);

        // Salvare în baza de date
        logRepository.save(log);

        // Scriere în fișier text (sincronizat pentru acces concurent)
        synchronized (this) {
            try (FileWriter fw = new FileWriter(LOG_FILE, true);
                 BufferedWriter bw = new BufferedWriter(fw);
                 PrintWriter out = new PrintWriter(bw)) {

                String logEntry = String.format("[%s] Client: %s | Command: %s | Details: %s",
                        log.getTimestamp().format(formatter),
                        clientId,
                        commandType,
                        details);
                out.println(logEntry);

            } catch (IOException e) {
                System.err.println("Eroare la scrierea în fișierul de log: " + e.getMessage());
            }
        }
    }
}
