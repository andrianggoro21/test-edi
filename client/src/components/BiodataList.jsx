import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getBiodataList } from "../services/biodataListApi";

const BiodataList = () => {
  const { id } = useParams();
  const [biodata, setBiodata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const getBiodata = async () => {
      try {
        const data = await getBiodataList(id, searchQuery);
        const formattedBiodata = data.data.map(item => {
            const date = new Date(item.tanggal_lahir);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  
            return {
              id: item.id,
              nama: item.nama,
              tempat_lahir: item.tempat_lahir,
              tanggal_lahir: formattedDate,
              posisi_yang_dilamar: item.posisi_yang_dilamar,
              user_id: item.user_id
            };
          });

        setBiodata(formattedBiodata);
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    getBiodata();
  }, [id, searchQuery]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    // Logic untuk menghapus biodata
    console.log(`Delete biodata with id: ${deleteId}`);
    setShowModal(false);
  };

  return (
    <div className="biodata-list-container">
      {/* <Button variant="primary" as={Link} to="/biodata/create" className="mb-3">
        Create Biodata
      </Button> */}
      <Form.Control
        type="text"
        placeholder="Search by name"
        className="mb-3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Tempat Lahir</th>
            <th>Tanggal Lahir</th>
            <th>Posisi yang Dilamar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {biodata.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.tempat_lahir}</td>
              <td>{item.tanggal_lahir}</td>
              <td>{item.posisi_yang_dilamar}</td>
              <td>
                <Button
                  variant="outline-primary"
                  as={Link}
                  to={`/biodata/edit/${item.user_id}`}
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(item.user_id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal konfirmasi hapus */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus biodata ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BiodataList;
