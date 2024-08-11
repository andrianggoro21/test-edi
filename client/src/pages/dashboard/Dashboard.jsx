import BiodataList from '../../components/BiodataList';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page d-flex flex-column align-items-center">
      <h1 className="mb-4">Biodata List</h1>
      <BiodataList />
    </div>
  );
};

export default Dashboard;
