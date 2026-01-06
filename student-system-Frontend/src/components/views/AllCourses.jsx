import { useState, useEffect } from "react";
import { api } from "../../services/api";

const AllCourses = ({ clientId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
  }, [clientId]);

  const formatTime = (time) => {
    if (!time && time !== 0) return "-";
    const t = String(time).padStart(4, "0");
    return `${t.slice(0, 2)}:${t.slice(2)}`;
  };

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAllCourses(clientId);
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Se încarcă...</div>;
  }

  if (error) {
    return <div className="message error">Eroare: {error}</div>;
  }

  if (courses.length === 0) {
    return <div className="message info">Nu există cursuri în sistem.</div>;
  }

  return (
    <div>
      <h2>📚 Lista Tuturor Cursurilor</h2>
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

              <td>{course.instructor ||"-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCourses;
