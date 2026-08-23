
import { useState } from "react";

import {
    Eye,
    EyeOff,
    LoaderCircle,
    ArrowRight
} from "lucide-react";

import { GoogleLogin } from "@react-oauth/google";

import "./Login.css";

import logo from "../../assets/logo.svg";


function Login({ onLogin, onSwitchToSignup }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ==========================================
    // GOOGLE LOGIN
    // ==========================================

    async function handleGoogleSuccess(credentialResponse) {

        try {

            setLoading(true);
            setError("");

            console.log(
                "🔐 GOOGLE CREDENTIAL RECEIVED"
            );


            if (!credentialResponse?.credential) {

                throw new Error(
                    "Google did not return a credential."
                );

            }


             const response = await fetch(
    "https://growell-ai-2.onrender.com/api/auth/google",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        credential:
                            credentialResponse.credential
                    })
                }
            );


            const data =
                await response.json();


            console.log(
                "🔐 GOOGLE LOGIN RESPONSE:",
                data
            );


            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Google sign-in failed."
                );

            }


            // ==================================
            // SAVE TOKEN
            // ==================================

            if (data.token) {

                localStorage.setItem(
                    "growell_token",
                    data.token
                );

            }


            // ==================================
            // SAVE USER
            // ==================================

            if (data.user) {

                localStorage.setItem(
                    "growell_user",
                    JSON.stringify(data.user)
                );

            }


            console.log(
                "✅ GOOGLE LOGIN SUCCESS"
            );


            // ==================================
            // GO TO DASHBOARD
            // ==================================

            if (onLogin) {

                onLogin(
                    data.user
                );

            }


        } catch (error) {

            console.error(
                "❌ GOOGLE LOGIN ERROR:",
                error
            );


            setError(
                error.message ||
                "Unable to connect to GroWell AI server."
            );


        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // GOOGLE LOGIN ERROR
    // ==========================================

    function handleGoogleError() {

        console.error(
            "❌ GOOGLE SIGN-IN FAILED"
        );


        setError(
            "Google sign-in was cancelled or failed."
        );

    }


    // ==========================================
    // EMAIL + PASSWORD LOGIN
    // ==========================================

    async function handleLogin(e) {

        e.preventDefault();

        setError("");


        if (!email || !password) {

            setError(
                "Please enter your email and password."
            );

            return;

        }


        try {

            setLoading(true);


           const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok || !data.success) {

                setError(
                    data.message ||
                    "Login failed."
                );

                return;

            }


            // ==================================
            // SAVE NORMAL LOGIN
            // ==================================

            localStorage.setItem(
                "growell_token",
                data.token
            );


            localStorage.setItem(
                "growell_user",
                JSON.stringify(data.user)
            );


            // ==================================
            // GO TO DASHBOARD
            // ==================================

            if (onLogin) {

                onLogin(
                    data.user
                );

            }


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );


            setError(
                "Unable to connect to GroWell AI server."
            );


        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // PAGE
    // ==========================================

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

            <div className="login-card">


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
                        Welcome back
                    </h2>


                    <p>
                        Sign in to continue your journey
                        with GroWell AI.
                    </p>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="login-error">

                        {error}

                    </div>

                )}


                {/* EMAIL + PASSWORD FORM */}

                <form onSubmit={handleLogin}>


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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                autoComplete="current-password"
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


                    {/* OPTIONS */}

                    <div className="login-options">

                        <label className="remember">

                            <input
                                type="checkbox"
                            />

                            <span>
                                Remember me
                            </span>

                        </label>


                        <button
                            type="button"
                            className="forgot-password"
                        >
                            Forgot password?
                        </button>

                    </div>


                    {/* LOGIN BUTTON */}

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

                                Signing in...

                            </>

                        ) : (

                            <>

                                Sign In

                                <ArrowRight
                                    size={17}
                                />

                            </>

                        )}

                    </button>


                </form>


                {/* ==================================
                    GOOGLE LOGIN
                ================================== */}

                <div className="google-login-section">


                    <div className="login-divider">

                        <span></span>

                        <p>
                            OR CONTINUE WITH
                        </p>

                        <span></span>

                    </div>


                    <div className="google-button-wrapper">

                        <GoogleLogin

                            onSuccess={
                                handleGoogleSuccess
                            }

                            onError={
                                handleGoogleError
                            }

                            useOneTap={false}

                            theme="outline"

                            size="large"

                            text="continue_with"

                            shape="rectangular"

                            width="100%"

                        />

                    </div>


                </div>


                {/* SIGN UP */}

                <div className="signup-prompt">

                    <span>
                        Don't have an account?
                    </span>


                    <button
                        type="button"
                        onClick={onSwitchToSignup}
                    >

                        Create account

                    </button>

                </div>


                {/* FOOTER */}

                <div className="login-footer">

                    <span>
                        🌱
                    </span>

                    Intelligent farming.
                    Better decisions.

                </div>


            </div>


        </div>

    );

}


export default Login;
