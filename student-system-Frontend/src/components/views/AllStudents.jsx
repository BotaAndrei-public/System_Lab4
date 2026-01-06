import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const AllStudents = ({ clientId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudents();
  }, [clientId]);

  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAllStudents(clientId);
      setStudents(data);
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

  if (students.length === 0) {
    return <div className="message info">Nu există studenți în sistem.</div>;
  }

  return (
    <div>
      <h2>📋 Lista Tuturor Studenților</h2>
      <table className="result-table">
        <thead>
          <tr>
            <th>ID Student</th>
            <th>Nume</th>
            <th>Specializare</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.sid}>
              <td>{student.sid || '-'}</td>
              <td>{student.name || '-'}</td>
              <td>{student.specialization || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
