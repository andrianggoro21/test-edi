import { useSelector } from "react-redux";
import BiodataList from "../../components/BiodataList";
import "./Dashboard.css";
import UserBiodata from "../../components/UserBiodata";

const Dashboard = () => {
  const { role_id } = useSelector((state) => state.AuthReducer.user || {});
  return (
    <div className="dashboard-page d-flex flex-column align-items-center">
      <h1 className="mb-4">{role_id === 1 ? "Biodata List" : "Biodata"}</h1>
      {role_id === 1 ? <BiodataList /> : <UserBiodata />}
    </div>
  );
};

export default Dashboard;
