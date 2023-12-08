import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Heading, InputField, Button } from "../components";
import { loginValidation } from "../data/validation";
import AuthController from "../controllers/authController";
import ToastController from "../controllers/ToastController";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (data) => {
    console.log(data, "@Data...");
    setProcessing(true);
    AuthController.loginUser({
      username: data?.email,
      password: data?.password,
    })
      .then((res) => {
        ToastController.success("Login Successfully!");
        console.log(res, "@login res");
        AuthController.persistCredentials(res);
      })
      .catch((err) => {
        console.log("@auth err...", err);
        ToastController.error(err?.message);
      })
      .finally(() => setProcessing(false));
  };

  return (
    <>
      <div className="loginpage">
        <div className="loginpage-container">
          <Heading>Sign in</Heading>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnMount
            validationSchema={loginValidation}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {(formik) => (
              <Form>
                <InputField
                  name="email"
                  label="Email"
                  place="Enter your email"
                  type="Email"
                />
                <InputField
                  name="password"
                  label="Password"
                  place="Enter your password"
                  type="password"
                />

                <Button disabled={processing}>
                  {processing ? "Loading..." : "Sign in"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
