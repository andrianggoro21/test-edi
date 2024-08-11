import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../services/registerApi";

// Schema validasi menggunakan Yup
const RegisterScheme = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: RegisterScheme,
    onSubmit: async (values, { resetForm }) => {
      try {
        await registerUser(values.email, values.password);
        resetForm();
        alert("Registration successful! Please login.");
        navigate("/login");
      } catch (error) {
        alert(error.response.data.message);
        console.error("Error registering user:", error.message);
      }
    },
  });

  return (
    <Card className="register-card p-4">
      <Card.Body>
        <Card.Title className="text-center mb-4 text-muted">
          Register
        </Card.Title>
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
            Register
          </Button>

          <div className="text-center mt-3">
            <span className="text-muted">Already have an account? </span>
            <a href="/login" className="text-primary">
              Login
            </a>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RegisterForm;
