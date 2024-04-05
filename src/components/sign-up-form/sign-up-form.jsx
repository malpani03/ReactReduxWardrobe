import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
import Button from "../Button/Button";
import FormInput from "../form-input/form-input";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./sign-up-form.scss";

// Define default form field values
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // State to manage form fields
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [alertOpen, setAlertOpen] = useState(false);
  const { displayName, email, password, confirmPassword } = formFields;

  // Function to reset form fields to default values
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Create user with email and password
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Create user document with additional data
      await createUserDocumentFromAuth(user, { displayName });

      // Reset form fields after successful signup
      resetFormFields();

      // Display success message
      setAlertOpen(true);
    } catch (error) {
      // Handle errors, such as email already in use
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      console.log(error);
    }
  };

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update form fields with new values
    setFormFields({ ...formFields, [name]: value });
  };

  // Function to close the alert
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't Have an account? </h2>
      <span>Sign up with your email and password </span>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          minLength="8"
          maxLength="12"
          size="12"
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          minLength="8"
          maxLength="12"
          size="12"
        />
        {/* Sign up button */}
        <Button type="submit">Sign Up</Button>
      </form>
      {/* Success alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity="success"
        >
          Registered successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default SignUpForm;
