import AllStudents from './views/AllStudents';
import AllCourses from './views/AllCourses';
import RegisteredStudents from './views/RegisteredStudents';
import RegisteredCourses from './views/RegisteredCourses';
import CompletedCourses from './views/CompletedCourses';
import RegisterStudent from './views/RegisterStudent';

const Content = ({ activeView, clientId }) => {
  const renderView = () => {
    switch (activeView) {
      case 'students':
        return <AllStudents clientId={clientId} />;
      case 'courses':
        return <AllCourses clientId={clientId} />;
      case 'registered-students':
        return <RegisteredStudents clientId={clientId} />;
      case 'registered-courses':
        return <RegisteredCourses clientId={clientId} />;
      case 'completed-courses':
        return <CompletedCourses clientId={clientId} />;
      case 'register':
        return <RegisterStudent clientId={clientId} />;
      default:
        return (
          <div className="home-message">
            <h2>Bun venit!</h2>
            <p>Selectați o opțiune din meniu pentru a continua</p>
          </div>
        );
    }
  };

  return <div className="content">{renderView()}</div>;
};

export default Content;
