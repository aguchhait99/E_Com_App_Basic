import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (response && response.data.success) {
        toast.success(response.data && response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something Wrong");
    }
  };

  return (
    <>
      <Layout>
        <Container maxWidth="sm">
          <h1 style={{ textAlign: "center" }}>Change Password</h1>\
          <form onSubmit={handleSubmit}>
            <FormGroup
              sx={{
                width: "50%",
                margin: "auto",
                padding: 10,
                boxShadow: "0px 0px 30px rgba(0,0,0,1)",
              }}
            >
              <FormControl sx={{ paddingBottom: 2 }}>
                <InputLabel>Email</InputLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl sx={{ paddingBottom: 2 }}>
                <InputLabel>Answer</InputLabel>
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 5, mb: 2 }}
                type="submit"
              >
                Change Password
              </Button>
              <div></div>
            </FormGroup>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default ForgetPassword;
