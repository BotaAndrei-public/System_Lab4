const Menu = ({ setActiveView }) => {
  const menuItems = [
    { id: 'students', label: '👨‍🎓 Lista Studenți', icon: '👨‍🎓' },
    { id: 'courses', label: '📚 Lista Cursuri', icon: '📚' },
    { id: 'registered-students', label: '🔍 Studenți la Curs', icon: '🔍' },
    { id: 'registered-courses', label: '📋 Cursuri Student', icon: '📋' },
    { id: 'completed-courses', label: '✅ Cursuri Absolvite', icon: '✅' },
    { id: 'register', label: '➕ Înregistrare Nouă', icon: '➕' },
  ];

  return (
    <div className="menu">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className="menu-button"
          onClick={() => setActiveView(item.id)}
        >
          <span>{item.icon}</span>
          {item.label.replace(item.icon + ' ', '')}
        </button>
      ))}
    </div>
  );
};

export default Menu;
