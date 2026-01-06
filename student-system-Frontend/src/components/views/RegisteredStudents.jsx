import { useState } from 'react';
import { api } from '../../services/api';

const RegisteredStudents = ({ clientId }) => {
  const [courseId, setCourseId] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!courseId.trim()) {
      setError('Introduceți un ID de curs!');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const data = await api.getRegisteredStudents(courseId, clientId);
      setStudents(data);
    } catch (err) {
      setError(err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>🔍 Studenți Înregistrați la un Curs</h2>
      
      <form onSubmit={handleSearch} className="input-section">
        <div className="input-group">
          <label>ID Curs:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Ex: 17651"
          />
        </div>
        <button type="submit" className="btn-primary">
          Caută
        </button>
      </form>

      <div className="results-container">
        {loading && <div className="loading">Se încarcă...</div>}
        
        {error && <div className="message error">Eroare: {error}</div>}
        
        {!loading && !error && searched && students.length === 0 && (
          <div className="message info">Nu sunt studenți înregistrați la acest curs.</div>
        )}
        
        {!loading && !error && students.length > 0 && (
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
                <tr key={student.sid || student.id || index}>
                  <td>{student.sid || '-'}</td>
                  <td>{student.name || '-'}</td>
                  <td>{student.specialization || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RegisteredStudents;
