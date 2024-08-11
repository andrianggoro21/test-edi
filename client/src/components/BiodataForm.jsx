import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { getBiodataList } from "../services/biodataListApi";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_API_BASE_URL;

const BiodataForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const fetchBiodata = useCallback(async () => {
    try {
      const response = await getBiodataList(id);
      const fetchedBiodata = response.data;
      setFormData(fetchedBiodata);
    } catch (error) {
      console.error("Error fetching biodata:", error);
    }
  }, [id]);
  useEffect(() => {
    if (isEdit) {
      fetchBiodata();
    }
  }, [id, isEdit, fetchBiodata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = isEdit ? formData : { ...formData, user_id: id };
      if (isEdit) {
        // Send PATCH request to update biodata
        await axios.patch(`${API_URL}/biodata/${id}`, submitData);
        // console.log("Biodata updated:", { id, ...formData });
        alert("Biodata submitted successfully");
        await fetchBiodata();
      } else {
        await axios.post(`${API_URL}/biodata`, submitData);
        alert("Biodata submitted successfully");
        navigate(`/biodata/${id}`, { state: { refresh: true } });
      }
    } catch (error) {
      console.error("Error submitting biodata:", error);
    }
  };

  return (
    <Card className="biodata-form-card p-4">
      <Card.Body>
        <Card.Title className="text-center mb-4 text-muted">
          {isEdit ? "Edit Biodata" : "Create Biodata"}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formPosisiYangDilamar">
                <Form.Label className="text-muted">
                  Posisi yang Dilamar
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter posisi yang dilamar"
                  name="posisi_yang_dilamar"
                  value={formData.posisi_yang_dilamar}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formNama">
                <Form.Label className="text-muted">Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formNoKtp">
                <Form.Label className="text-muted">No KTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter No KTP"
                  name="no_ktp"
                  value={formData.no_ktp}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTempatLahir">
                <Form.Label className="text-muted">Tempat Lahir</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tempat lahir"
                  name="tempat_lahir"
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formTanggalLahir">
                <Form.Label className="text-muted">Tanggal Lahir</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggal_lahir"
                  value={
                    formData.tanggal_lahir
                      ? formData.tanggal_lahir.split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formJenisKelamin">
                <Form.Label className="text-muted">Jenis Kelamin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter jenis kelamin"
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formNoTelp">
                <Form.Label className="text-muted">No Telp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter No Telp"
                  name="no_telp"
                  value={formData.no_telp}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPenghasilanDiharapkan">
                <Form.Label className="text-muted">
                  Penghasilan Diharapkan
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter penghasilan diharapkan"
                  name="penghasilan_diharapkan"
                  value={formData.penghasilan_diharapkan}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAgama">
                <Form.Label className="text-muted">Agama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter agama"
                  name="agama"
                  value={formData.agama}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGolonganDarah">
                <Form.Label className="text-muted">Golongan Darah</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter golongan darah"
                  name="golongan_darah"
                  value={formData.golongan_darah}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label className="text-muted">Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAlamatKtp">
                <Form.Label className="text-muted">Alamat KTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter alamat KTP"
                  name="alamat_ktp"
                  value={formData.alamat_ktp}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAlamatTinggal">
                <Form.Label className="text-muted">Alamat Tinggal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter alamat tinggal"
                  name="alamat_tinggal"
                  value={formData.alamat_tinggal}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {isEdit && (
                <Form.Group controlId="formEmail">
                  <Form.Label className="text-muted">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData?.user?.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              )}

              <Form.Group controlId="formBersediaDitempatkan">
                <Form.Label className="text-muted">
                  Bersedia Ditempatkan
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter bersedia ditempatkan"
                  name="bersedia_ditempatkan"
                  value={formData.bersedia_ditempatkan}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100">
            {isEdit ? "Update Biodata" : "Create Biodata"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

BiodataForm.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

export default BiodataForm;
