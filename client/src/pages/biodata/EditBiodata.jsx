import BiodataForm from "../../components/BiodataForm"
import './Biodata.css';

const EditBiodata = () => {
  return (
    <div className="edit-biodata-page d-flex justify-content-center align-items-center vh-100">
      <BiodataForm isEdit={true} />
    </div>
  )
}

export default EditBiodata