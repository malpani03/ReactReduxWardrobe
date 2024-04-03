import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";
import Button from "../Button/Button"; // Importing Button component
import FormInput from "../form-input/form-input"; // Importing FormInput component
import "./sign-in-form.scss"; // Importing styles for the SignInForm component

// Default form fields
const defaultFormFields = {
  email: "",
  password: "",
};

// SignInForm component
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields); // State for form fields
  const { email, password } = formFields; // Destructuring email and password from formFields

  // Function to reset form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Function to sign in with Google
  const SignInWithGoogle = async () => {
    try {
      await signInWithGooglePopup(); // Calling signInWithGooglePopup function from firebase.util
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      ); // Signing in with email and password
      resetFormFields();
      navigate('/'); // Resetting form fields after successful sign-in
    } catch (error) {
      // Handling different authentication errors
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

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value }); // Updating formFields state with new values
  };

  const navigate=useNavigate();

  // Rendering SignInForm component
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
    </div>
  );
};

export default SignInForm; // Exporting SignInForm component
