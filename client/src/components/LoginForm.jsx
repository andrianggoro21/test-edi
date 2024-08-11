

// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducer/authReducer';


// Schema validasi menggunakan Yup
const SignInScheme = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();
  // const from = location.state?.from || { pathname: '/' };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInScheme,
    onSubmit: (values, { resetForm }) => {
      // Gantilah dispatch dengan logika autentikasi Anda
      dispatch(login(values.email, values.password, navigate));
      resetForm();
    },
  });

  return (
    <Card className="login-card p-4">
      <Card.Body>
        <Card.Title className="text-center mb-4 text-muted">Login</Card.Title>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-muted">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label className="text-muted">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 custom-button"
          >
            Login
          </Button>

          <div className="text-center mt-3">
            <span className="text-muted">Dont have an account? </span>
            <a href="/register" className="text-primary">
              Register
            </a>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;

