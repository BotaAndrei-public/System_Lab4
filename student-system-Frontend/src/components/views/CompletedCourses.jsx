import { useState } from 'react';
import { api } from '../../services/api';

const CompletedCourses = ({ clientId }) => {
  const [studentId, setStudentId] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!studentId.trim()) {
      setError('Introduceți un ID de student!');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const data = await api.getCompletedCourses(studentId, clientId);
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
      <h2>✅ Cursuri Absolvite de Student</h2>
      
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
          <div className="message info">Nu sunt cursuri absolvite.</div>
        )}
        
        {!loading && !error && courses.length > 0 && (
          <ul className="course-list">
            {courses.map((course, index) => (
              <li key={index} className="course-item">
                📖 {typeof course === 'string' ? course : course.cid || course.id || course.name || 'Curs necunoscut'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompletedCourses;
