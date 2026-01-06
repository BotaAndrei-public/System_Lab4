import { useState, useEffect } from "react";

const Header = ({ clientId, setClientId }) => {
  const [tempClientId, setTempClientId] = useState(clientId);

  // sincronizeaza daca clientId se schimba din exterior
  useEffect(() => {
    setTempClientId(clientId);
  }, [clientId]);

  const handleConfirm = () => {
    if (!tempClientId.trim()) return; // protectie
    setClientId(tempClientId.trim());
  };

  return (
    <div className="header">
      <h1>🎓 Sistem Înregistrare Studenți</h1>
      <p>Aplicație cu Spring Boot & REST API</p>

      <div className="client-section">
        <label>ID Client:</label>

        <input
          type="text"
          value={tempClientId}
          onChange={(e) => setTempClientId(e.target.value)}
          placeholder="Introduceți ID-ul dvs."
        />

        <button onClick={handleConfirm} className="menu-button-user">
          Confirmă
        </button>

        <span className="status-badge">
          <span className="status-dot"></span>
          Connected
        </span>
      </div>
    </div>
  );
};

export default Header;
