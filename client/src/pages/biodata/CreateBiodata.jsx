import BiodataForm from '../../components/BiodataForm';
import './Biodata.css';

const CreateBiodata = () => {
  return (
    <div className="create-biodata-page d-flex justify-content-center align-items-center vh-100">
      <BiodataForm isEdit={false} />
    </div>
  );
};

export default CreateBiodata;
