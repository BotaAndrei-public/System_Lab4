import { useState } from "react";
import { api } from "../../services/api";

const RegisteredCourses = ({ clientId }) => {
  const [studentId, setStudentId] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!studentId.trim()) {
      setError("Introduceți un ID de student!");
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const data = await api.getRegisteredCourses(studentId, clientId);
      setCourses(data);
    } catch (err) {
      setError(err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>📋 Cursuri la care este Înregistrat un Student</h2>

      <form onSubmit={handleSearch} className="input-section">
        <div className="input-group">
          <label>ID Student:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Ex: 123456789"
          />
        </div>
        <button type="submit" className="btn-primary">
          Caută
        </button>
      </form>

      <div className="results-container">
        {loading && <div className="loading">Se încarcă...</div>}

        {error && <div className="message error">Eroare: {error}</div>}

        {!loading && !error && searched && courses.length === 0 && (
          <div className="message info">
            Studentul nu este înregistrat la cursuri.
          </div>
        )}

        {!loading && !error && courses.length > 0 && (
          <table className="result-table">
            <thead>
              <tr>
                <th>ID Curs</th>
                <th>Nume</th>
                <th>Zi</th>
                <th>Orar</th>
                <th>Profesor</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.cid}>
                  <td>{course.cid || "-"}</td>
                  <td>{course.name || "-"}</td>
                  <td>{course.days || "-"}</td>
                  <td>
                    {course.startTime != null && course.endTime != null
                      ? `${formatTime(course.startTime)} - ${formatTime(
                          course.endTime
                        )}`
                      : "-"}
                  </td>
                  <td>{course.instructor || course.teacher || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RegisteredCourses;
