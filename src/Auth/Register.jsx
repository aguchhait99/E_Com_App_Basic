import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (response && response.data.success) {
        toast.success(response.data && response.data.message);
        navigate("/login");
        console.log("reg", response.data);
      } else {
        toast.error(response.data.message);
        console.log(response.data);
      }
    } catch (error) {
      toast.error("Somwthing Wrong");
      console.log("wrong");
    }
  };
  return (
    <>
      <Layout title={"Register Page"}>
        <Container maxWidth="sm">
          <h1 style={{ textAlign: "center" }}>Register Form</h1>
          <form onSubmit={handleSubmit}>
            <FormGroup
            style={{
                width: "60%",
                margin: "auto",
                padding: 30,
                boxShadow: "0px 0px 30px rgba(0,0,0,1)",
              }}>
              <FormControl sx={{ paddingBottom: 2 }}>
                <InputLabel>Name</InputLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>
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
                <InputLabel>Password</InputLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl sx={{ paddingBottom: 2 }}>
                <InputLabel>Phone</InputLabel>
                <Input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl sx={{ paddingBottom: 3 }}>
                <InputLabel>Address</InputLabel>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl sx={{ paddingBottom: 2 }}>
                <InputLabel>What is your chilhood name?</InputLabel>
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </FormControl>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 5 }}
                type="submit"
              >
                Register
              </Button>
            </FormGroup>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default Register;
