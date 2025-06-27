import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Signup = () => {
  const signUPData = {
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confrimPassword: "",
    agreeToPolicy: false,
  };

  const [formData, setFormData] = useState(signUPData);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confrimPassword) {
      toast.warning("Password does not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Firstname: formData.firstName,
          Lastname: formData.lastName,
          PhoneNumber: formData.phoneNumber,
        });
      }
      console.log(user);
      console.log("User registered Successfully");
      toast.success("You're registered successfully. Procced to login", {
        position: "top-right",
      });
      setSubmit(true);
      setFormData(signUPData);
      setTimeout(() => {
        navigate("/login");
        setSubmit(false);
      }, 2000);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-left",
      });
    }
  };
  return (
    <>
      <section>
        <div className="h-screen grid place-items-center bg-gray-300">
          <div className="w-[80%] sm:w-[50rem] shadow-2xl rounded-2xl bg-white p-10">
            <div className="text-center">
              <h1 className="font-bold text-[2rem] md:text-[2rem] mb-10">
                Create your account
              </h1>
              <h2 className="font-bold text-[1rem] mb-2">Hello there,</h2>
              <p>
                Welcome to CTMIS app. Please fill in your details to create an
                account.
              </p>
            </div>
            {submit ? (
              <div className="spinner font-bold text-3xl my-7">
                Creating your account...
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
                    <div>
                      <label className="block">
                        Lastname:
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Enter your lastname"
                        required
                      />
                    </div>
                    <div>
                      <label className="block">
                        Firstname:
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Enter your firstname"
                        required
                      />
                    </div>
                    <div>
                      <label className="block">
                        Email:
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block">
                        Phone Number:
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block">
                        Password:
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Enter a password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block">
                        Confrim Password:
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confrimPassword"
                        value={formData.confrimPassword}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="agreeToPolicy"
                        checked={formData.agreeToPolicy}
                        onChange={handleChange}
                        className="mr-2"
                        required
                      />
                      <label>
                        I have read & accept the{" "}
                        <a href="#" className="text-blue-600 underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-[100%]">
                  <button
                    type="submit"
                    className="px-28 py-4 text-base bg-gray-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            )}
            <div className="text-center">
              <p>
                Already have an account?
                <Link to="/login">
                  <span className="text-blue-500">Sign In</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
