import { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { getBiodataList } from "../services/biodataListApi";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

const UserBiodata = () => {
  const { id } = useParams();
  const [biodata, setBiodata] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("id", id);

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const response = await getBiodataList(id);
        const fetchedBiodata = response.data;

        if (!fetchedBiodata) {
          setBiodata(null);
          return;
        }
        const date = new Date(fetchedBiodata.tanggal_lahir);
        const formattedDate = `${String(date.getDate()).padStart(
          2,
          "0"
        )}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${date.getFullYear()}`;

        setBiodata({
          ...fetchedBiodata,
          tanggal_lahir: formattedDate,
        });
      } catch (error) {
        console.error("Error fetching biodata:", error);
      }
    };

    fetchBiodata();
  }, [id, location.state?.refresh]);

  const handleCreateBiodata = () => {
    navigate(`/biodata/create/${id}`);
  };

  if (!biodata) {
    return (
      <div>
        <Button
          variant="primary"
          onClick={handleCreateBiodata}
          className="mb-3"
        >
          Create Biodata
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10}>
          <Button
            variant="primary"
            as={Link}
            to={`/biodata/edit/${biodata.user_id}`}
            className="button-edit"
          >
            Edit Biodata
          </Button>
          <Table striped bordered hover className="w-100">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{biodata.id}</td>
              </tr>
              <tr>
                <td>Posisi yang Dilamar</td>
                <td>{biodata.posisi_yang_dilamar}</td>
              </tr>
              <tr>
                <td>Nama</td>
                <td>{biodata.nama}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{biodata.user.email}</td>
              </tr>
              <tr>
                <td>No KTP</td>
                <td>{biodata.no_ktp}</td>
              </tr>
              <tr>
                <td>Tempat Lahir</td>
                <td>{biodata.tempat_lahir}</td>
              </tr>
              <tr>
                <td>Tanggal Lahir</td>
                <td>{biodata.tanggal_lahir}</td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td>{biodata.jenis_kelamin}</td>
              </tr>
              <tr>
                <td>Agama</td>
                <td>{biodata.agama}</td>
              </tr>
              <tr>
                <td>Golongan Darah</td>
                <td>{biodata.golongan_darah}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{biodata.status}</td>
              </tr>
              <tr>
                <td>Alamat KTP</td>
                <td>{biodata.alamat_ktp}</td>
              </tr>
              <tr>
                <td>Alamat Tinggal</td>
                <td>{biodata.alamat_tinggal}</td>
              </tr>
              <tr>
                <td>No Telp</td>
                <td>{biodata.no_telp}</td>
              </tr>
              <tr>
                <td>Bersedia Ditempatkan</td>
                <td>{biodata.bersedia_ditempatkan}</td>
              </tr>
              <tr>
                <td>Penghasilan Diharapkan</td>
                <td>{biodata.penghasilan_diharapkan}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default UserBiodata;
