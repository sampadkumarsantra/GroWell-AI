import { useState } from "react";
import {
    Eye,
    EyeOff,
    LoaderCircle,
    ArrowRight
} from "lucide-react";

import "./Login.css";
import logo from "../../assets/logo.svg";


function Signup({ onSignup, onSwitchToLogin }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    async function handleSignup(e) {

        e.preventDefault();

        setError("");
        setSuccess("");


        if (!name || !email || !password || !confirmPassword) {

            setError("Please fill in all fields.");
            return;

        }


        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;

        }


        if (password !== confirmPassword) {

            setError("Passwords do not match.");
            return;

        }


        try {

            setLoading(true);


            const response = await fetch(
                "http://localhost:3000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok || !data.success) {

                setError(
                    data.message ||
                    "Unable to create account."
                );

                return;

            }


            setSuccess(
                "Account created successfully. You can now sign in."
            );


            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");


            setTimeout(() => {

                if (onSignup) {
                    onSignup();
                }

            }, 1200);


        } catch (error) {

            console.error(
                "SIGNUP ERROR:",
                error
            );

            setError(
                "Unable to connect to GroWell AI server."
            );

        } finally {

            setLoading(false);

        }

    }


    return (

        <div className="login-page">

            {/* BACKGROUND */}

            <div className="login-glow glow-one"></div>

            <div className="login-glow glow-two"></div>


            <div className="login-particles">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

            </div>


            {/* CARD */}

            <div className="login-card signup-card">


                {/* BRAND */}

                <div className="login-brand">

                    <div className="login-logo">

                        <img
                            src={logo}
                            alt="GroWell AI"
                        />

                    </div>


                    <div>

                        <h1>
                            GroWell AI
                        </h1>

                        <p>
                            Cultivating Intelligence
                        </p>

                    </div>

                </div>


                {/* HEADING */}

                <div className="login-heading">

                    <span className="login-eyebrow">
                        AGRICULTURAL INTELLIGENCE
                    </span>

                    <h2>
                        Create your account
                    </h2>

                    <p>
                        Start making smarter farming
                        decisions with GroWell AI.
                    </p>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="login-error">

                        {error}

                    </div>

                )}


                {/* SUCCESS */}

                {success && (

                    <div className="login-success">

                        {success}

                    </div>

                )}


                <form onSubmit={handleSignup}>


                    {/* NAME */}

                    <div className="form-group">

                        <label>
                            Full name
                        </label>

                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            autoComplete="name"
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            autoComplete="email"
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>


                        <div className="password-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                autoComplete="new-password"
                            />


                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {showPassword
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />
                                }

                            </button>

                        </div>

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div className="form-group">

                        <label>
                            Confirm password
                        </label>


                        <div className="password-wrapper">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Repeat your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                autoComplete="new-password"
                            />


                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >

                                {showConfirmPassword
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />
                                }

                            </button>

                        </div>

                    </div>


                    {/* CREATE ACCOUNT */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <LoaderCircle
                                    size={19}
                                    className="loading-icon"
                                />

                                Creating account...
                            </>

                        ) : (

                            <>
                                Create Account

                                <ArrowRight
                                    size={17}
                                />

                            </>

                        )}

                    </button>


                </form>


                {/* LOGIN */}

                <div className="signup-prompt">

                    <span>
                        Already have an account?
                    </span>


                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                    >
                        Sign in
                    </button>

                </div>


                {/* FOOTER */}

                <div className="login-footer">

                    <span>
                        🌱
                    </span>

                    Grow smarter.
                    Farm better.

                </div>

            </div>

        </div>

    );

}


export default Signup;