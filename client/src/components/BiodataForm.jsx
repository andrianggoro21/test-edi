import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BiodataForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isEdit) {
      // Fetch biodata by id from API and set initial state
      console.log(`Fetching biodata with id: ${id}`);
      // Simulate fetching data
      setName('John Doe');
      setEmail('john@example.com');
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Logic untuk update biodata
      console.log('Updating biodata:', { id, name, email });
    } else {
      // Logic untuk create biodata
      console.log('Creating biodata:', { name, email });
    }
    navigate('/dashboard');
  };

  return (
    <Card className="biodata-form-card p-4">
      <Card.Body>
        <Card.Title className="text-center mb-4 text-muted">
          {isEdit ? 'Edit Biodata' : 'Create Biodata'}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="text-muted">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label className="text-muted">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {isEdit ? 'Update Biodata' : 'Create Biodata'}
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
