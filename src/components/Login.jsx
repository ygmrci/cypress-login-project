import { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
// eğer react-router-dom v6 kullanıyorsan:
import { useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Please enter a valid email address",
  password:
    "Password must be at least 8 characters long and include at least one uppercase letter and one digit",
  terms: "You must accept the terms to continue",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const navigate = useNavigate(); // v5 kullanıyorsan useHistory'e geri döneriz

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Strong password: 8–12 karakter, en az bir büyük harf ve bir sayı
  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/.test(password);
  };
  const isValid =
    validateEmail(form.email) && validatePassword(form.password) && form.terms;

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));

    // field bazlı error güncelle
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: !validateEmail(newValue) }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: !validatePassword(newValue),
      }));
    }

    if (name === "terms") {
      setErrors((prev) => ({ ...prev, terms: !newValue }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    // Bu projede API zorunlu değil, direkt success sayfasına yolluyoruz
    navigate("/success");
  };

  return (
    <Form onSubmit={handleSubmit} data-cy="login-form">
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          data-cy="form-email"
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
        {errors.email && (
          <FormFeedback data-cy="error-email">
            {errorMessages.email}
          </FormFeedback>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          data-cy="form-password"
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
        {errors.password && (
          <FormFeedback data-cy="error-password">
            {errorMessages.password}
          </FormFeedback>
        )}
      </FormGroup>

      <FormGroup check>
        <Input
          data-cy="form-terms"
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
        />
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && (
          <FormFeedback data-cy="error-terms">
            {errorMessages.terms}
          </FormFeedback>
        )}
      </FormGroup>

      <FormGroup className="text-center p-4">
        <Button
          data-cy="form-submit"
          color="primary"
          disabled={!isValid}
          type="submit"
        >
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
