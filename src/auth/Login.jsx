import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../components/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You're successfully signed in", {
        position: "top-right",
      });

      setTimeout(() => {
        if (email === "admin@gmail.com" && password === "admin123*") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
        setSubmit(false);
      }, 2000);
    } catch (error) {
      toast.error(error.message, {
        position: "top-left",
      });
      setSubmit(false);
    }
  };

  return (
    <section>
      <div className="h-screen grid place-items-center bg-gray-300">
        <div className="w-[80%] sm:w-[50rem] shadow-2xl rounded-2xl bg-white p-10">
          <h1 className="font-bold text-[2rem] md:text-[2rem] text-center">
            Sign into your CTMIS account using
          </h1>

          {submit ? (
            <div className="text-center py-4 font-semibold text-gray-600">
              Loading...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
                <div>
                  <label className="block mb-2">
                    Email:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border p-2 rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    Password:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className="w-full border p-2 rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <label className="text-sm text-blue-500 cursor-pointer">
                    Forget Password?
                  </label>
                </div>
              </div>

              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  className="py-5 w-full text-base bg-gray-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center mt-4">
                <p>
                  Don't have an account?
                  <Link to="/signup">
                    <span className="text-blue-500 ml-1">Sign Up</span>
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
