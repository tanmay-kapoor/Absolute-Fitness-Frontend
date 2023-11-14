import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  validatemail,
  validatePassword,
  validateText,
  validPhone,
} from "../../utils/inputValidation";

import img1 from "../../Images/img1.jpg";
import logoImg from "../../Images/AbsoluteFitnessLogo.jpg";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: null,
    email: "",
    password: null,
    dob: null,
    sex: "",
    gymId: -1,
  });

  const [gymAddressId, setGymAddressId] = useState([]);

  useEffect(() => {
    // getting all gym locations
    const getAllGyms = async () => {
      try {
        const res = await axios.get("gym/");
        const gymData = res.data;
        setGymAddressId(gymData);
      } catch (err) {
        console.log(err);
      }
    };

    getAllGyms();
  }, []);
  //console.log(gymAddressId);  // need to print or above useEffect don't work as expected

  useEffect(() => {
    console.log(userDetails); //using this cuz setState lagging one step behind
  }, [userDetails]);

  const handleChange = (e) => {
    setUserDetails((o) => ({
      ...o,
      [e.target.name]: e.target.value,
    }));
  };

  const signup = async () => {
    if (
      validateText(userDetails.name) &&
      validatemail(userDetails.email) &&
      validPhone(userDetails.phone) &&
      userDetails.dob !== "" &&
      userDetails.sex !== "" &&
      userDetails.gymId !== -1 &&
      validatePassword(userDetails.password)
    ) {
      try {
        const res = await axios.post("user/signup", userDetails);

        try {
          const res1 = await axios.get(`user/${userDetails.email}`);
          const user = res1.data;
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err1) {
          console.log(err1);
        }

        navigate("/home");
      } catch (err) {
        alert(err.response.data.msg);
      }
    } else {
      alert("Please fill all the fields correctly");
    }
  };
  console.log(userDetails);

  return (
    <div className="container">
      <div className="d-flex flex-row mt-5">
        <div className="d-none d-md-block col-md-4">
          <img
            id="login-image"
            src={img1}
            alt="login-form-img"
            className="rounded-start h-100 w-100"
          />
        </div>

        <form className="login-form col-md-8 ms-2">
          <div className="d-flex flex-row mt-2 w-100">
            <img
              src={logoImg}
              alt="login form"
              className="rounded center"
              style={{ "max-width": "100px" }}
            />
          </div>

          <h5 className="center mt-2 mb-4">
            Log into your Absolte Fitness Account
          </h5>

          <div className="row">
            <div className="col-xs-12 col-md-6">
              <label for="name-input" className="form-label mb-2">
                Name
              </label>
              <input
                id="name-input"
                className="form-control form-control mb-2"
                type="text"
                onChange={handleChange}
                name="name"
                value={userDetails.name}
                required
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <label for="phone-input" className="form-label mb-2">
                Phone
              </label>
              <input
                id="phone-input"
                className="form-control form-control mb-2"
                type="number"
                onChange={handleChange}
                name="phone"
                value={userDetails.phone}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-6">
              <label for="email-input" className="form-label mb-2">
                Email
              </label>
              <input
                id="email-input"
                className="form-control form-control mb-2"
                type="email"
                onChange={handleChange}
                name="email"
                value={userDetails.email}
                required
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <label for="password-input" className="form-label mb-2">
                Password
              </label>
              <input
                id="password-input"
                className="form-control form-control mb-4"
                type="password"
                onChange={handleChange}
                value={userDetails.password}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-6">
              <label for="dob-input" className="form-label mb-2">
                Date of Birth
              </label>
              <input
                id="dob-input"
                type="date"
                className="form-control mb-2"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <label for="sex-input" className="form-label mb-2">
                Sex
              </label>
              <br />
              <select required className="custom-select w-100" id="sex-input">
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">hijda</option>
              </select>
            </div>
          </div>

          <p className="center mt-3">
            <button
              className=" center btn btn-dark mb-2 px-5"
              type="submit"
              onClick={signup}
              style={{ margin: "auto" }}
            >
              Sign up
            </button>
          </p>
          <p className=" center small mb-2 mt-0">Or</p>

          <p className="center small mt-2 mb-0 pb-lg-2">
            Have an account? <a href="login">Login here</a>
          </p>
          <p className="center small mb-5 pb-lg-2">
            Are you a staff? <a href="staff-login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
