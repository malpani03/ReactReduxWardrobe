import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";
import Button from "../Button/Button";
import FormInput from "../form-input/form-input";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./sign-in-form.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { email, password } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const SignInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
      setAlertMessage("Login successful!");
      setAlertOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          console.log("Email does not exist");
          break;
        case "auth/invalid-credential":
          alert("Incorrect password for the email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already Have an Account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={SignInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity="success"
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default SignInForm;
