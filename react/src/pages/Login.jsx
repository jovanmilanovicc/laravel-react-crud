import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios/axios.client";
import { useStateContext } from "../contexts/context-provider";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors(null);

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    if(response.data.errors){
                    setErrors(response.data.errors);
                    } else{
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                    //console.log(response.data.errors.email[0]);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Login</h1>
                {errors &&
              <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            }
                <form onSubmit={onSubmit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
