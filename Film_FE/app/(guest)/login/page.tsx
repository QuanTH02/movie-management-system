"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/common/Navbar";
import { useLogin, useRegister } from "@/app/lib/api/hooks";
import type { RegisterRequest } from "@/types/api.types";

function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerData, setRegisterData] = useState<RegisterRequest>({
    account: "",
    name: "",
    gmail: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { trigger: loginTrigger, isMutating: isLoggingIn } = useLogin({
    onSuccess: (data) => {
      if (data?.message === "Successfully logged in.") {
        if (typeof window !== "undefined") {
          localStorage.setItem("currentAccount", loginUsername);
        }
        router.push("/");
      }
    },
    onError: (error) => {
      alert(error?.message || "Login failed, please try again!");
    },
  });

  const { trigger: registerTrigger, isMutating: isRegistering } = useRegister({
    onSuccess: (data) => {
      alert(data?.message || "Registration successful!");
      setIsSignUp(false);
    },
    onError: (error) => {
      alert(error?.message || "Registration failed, please try again!");
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      alert("Please fill in all fields");
      return;
    }
    await loginTrigger({ username: loginUsername, password: loginPassword });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirm_password) {
      alert("Password and Confirm Password must be the same!");
      return;
    }
    if (registerData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    await registerTrigger(registerData);
  };

  return (
    <>
      <Navbar />
      <div className="bg-login" style={{ paddingTop: "56px" }}>
        <br />
        <br />
        <div className="cont">
          <div className={`form ${isSignUp ? "sign-up" : "sign-in"}`}>
            <h2 style={{ color: "black" }}>Welcome</h2>
            <br />
            {!isSignUp ? (
              <form onSubmit={handleLogin}>
                <label>
                  <span>Account</span>
                  <input
                    className="input-login"
                    id="login-account"
                    type="text"
                    placeholder="Enter your account"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <span>Password</span>
                  <div style={{ width: "100%" }}>
                    <input
                      className="input-login"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      id="passwordField1"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <i
                      className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        color: "black",
                        fontSize: "16px",
                        position: "absolute",
                        marginTop: "-20px",
                        marginLeft: "238px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </label>
                <p
                  className="forgot-pass mt-2"
                  style={{ fontStyle: "italic", marginTop: "0px" }}
                >
                  <a href="#" style={{ color: "black", fontSize: "14px" }}>
                    Forgot password?
                  </a>
                </p>
                <button
                  type="submit"
                  className="submit"
                  id="btn-sign-in"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Signing In..." : "Sign In"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <label>
                  <span>Account</span>
                  <input
                    className="input-login"
                    id="register-account"
                    type="text"
                    placeholder="Enter your account"
                    value={registerData.account}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        account: e.target.value,
                      })
                    }
                    required
                  />
                </label>
                <label>
                  <span>Name</span>
                  <input
                    className="input-login"
                    id="nameField"
                    type="text"
                    placeholder="Enter your name"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    className="input-login"
                    id="emailField"
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.gmail}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        gmail: e.target.value,
                      })
                    }
                    required
                  />
                </label>
                <label>
                  <span>Password</span>
                  <div style={{ width: "100%" }}>
                    <input
                      className="input-login"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      id="passwordField2"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <i
                      className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        color: "black",
                        fontSize: "16px",
                        position: "absolute",
                        marginTop: "-20px",
                        marginLeft: "238px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </label>
                <label>
                  <span>Confirm Password</span>
                  <div style={{ width: "100%" }}>
                    <input
                      className="input-login"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      id="confirmPasswordField"
                      value={registerData.confirm_password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirm_password: e.target.value,
                        })
                      }
                      required
                    />
                    <i
                      className={`fa ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        color: "black",
                        fontSize: "16px",
                        position: "absolute",
                        marginTop: "-20px",
                        marginLeft: "238px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </label>
                <button
                  type="submit"
                  className="submit"
                  id="btn-sign-up"
                  disabled={isRegistering}
                >
                  {isRegistering ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
            )}
          </div>
          <div className="sub-cont">
            <div className="img">
              <div className={`img__text m--${isSignUp ? "in" : "up"}`}>
                <h3>
                  {isSignUp
                    ? "If you already has an account, just sign in."
                    : "Don't have an account? Please Sign up!"}
                </h3>
              </div>
              <div className="img__btn" onClick={() => setIsSignUp(!isSignUp)}>
                <span className={`m--${isSignUp ? "in" : "up"}`}>
                  {isSignUp ? "Sign In" : "Sign Up"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
