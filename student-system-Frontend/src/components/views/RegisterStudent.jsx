import { useState } from 'react';
import { api } from '../../services/api';

const RegisterStudent = ({ clientId }) => {
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!studentId.trim() || !courseId.trim()) {
      setError('Completați ambele câmpuri!');
      setSuccess(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const data = await api.registerStudent(studentId, courseId, clientId);
      const message = (data && (data.message || data.msg)) || 'Înregistrare reușită!';
      setSuccess(message);
      
      // Reset form
      setStudentId('');
      setCourseId('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>➕ Înregistrare Nouă Student la Curs</h2>
      
      <form onSubmit={handleSubmit} className="input-section">
        <div className="input-group">
          <label>ID Student:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Ex: 123456789"
            disabled={loading}
          />
        </div>
        
        <div className="input-group">
          <label>ID Curs:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Ex: 17651"
            disabled={loading}
          />
        </div>
        
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Se procesează...' : 'Înregistrează'}
        </button>
      </form>

      <div className="results-container">
        {error && <div className="message error">Eroare: {error}</div>}
        {success && <div className="message success">✅ {success}</div>}
      </div>
    </div>
  );
};

export default RegisterStudent;
