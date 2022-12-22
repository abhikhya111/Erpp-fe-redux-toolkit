import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendLoginRequest } from '../../features/login/LoginSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components/macro";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useAuth from "../../hooks/useAuth";
import './Login.css'

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 9999,
    color: "#fff"
  }
}));
const LoginComponent = (props) => {
    const auth = useAuth();
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [infoType, setInfoType] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [logginIn, setLogginIn] = useState(false);
  
    useEffect(() => {
        if (!logginIn) {
          setIsLoading(true);
          const checkLogin = async () => {
            let token = localStorage.getItem("token");
            if (token) {
              const result = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/users/validatetoken`,
                {
                  headers: {
                    token
                  }
                }
              );
              // console.log("Result ", result);
              if (result.status === 200) {
                await auth.fetchUser(token, result.data.data._id);
                setIsLoading(false);
                props.history.push("/");
              }
              setIsLoading(false);
            }
            setIsLoading(false);
          };
    
          checkLogin();
          setIsLoading(false);
        }
        setIsLoading(false);
      }, [auth, props.history]); // eslint-disable-line react-hooks/exhaustive-deps
    
      const handleLogin = async function (e) {
        e.preventDefault();
    
        if (!username) {
          setInfoType("error");
          setErrorMessage("Please enter username");
          return;
        }
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(String(username).toLowerCase())) {
          setInfoType("error");
          setErrorMessage("Please enter a valid username");
          return;
        }
        setErrorMessage(null);
        setLogginIn(true);
        setIsLoading(true);
        e.preventDefault();
        // console.log("State ", username, password);
        setTimeout(async () => {
          await auth.signin(username.toLowerCase(), password);
          setIsLoading(false);
          // console.log("login successfull");
          // console.log("Props ", props);
          props.history.push("/");
          // setUsername("");
          // setPassword("");
        }, 2000);
      };

    // const { isLoading, access_token, message } = useSelector(
    //     (state) => state.login
    // ) 

    const dispatch = useDispatch();

    const onFormSubmitHandler = (e) => {
        alert("hi")
        e.preventDefault();
        let payload = {
            username: "partner@liquetit.ca",
            password: "Admin@12345",
            device_type: "web",
            device_token: ""

        }

        onLogin(payload);
    }

    const onLogin = async(payload) => {
        dispatch(sendLoginRequest(payload))
        .then((data) => {
            const response = data.payload;
            console.log("response", response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <>
        <Container style={{zoom:"110%"}}>
      <div id="loginform">
        <img
          alt="logo"
          src="https://glentraffic.ca/wp-content/uploads/2021/08/GlenTraffic-logo.png"
          style={{ width: "200px", height: "50px" }}
        />
        <h2 id="headerTitle">Welcome</h2>
        <p style={{ color: "#083864", margin: "12px" }}>
          Continue with your company domain ID & password
        </p>
        {/* {auth.user ? (
          <MyButton onClick={handleLogout}>Logout</MyButton>
        ) : ( */}
        <div>
          <div className="row">
            <label>User ID</label>
            <input
              type={"text"}
              value={username}
              placeholder={"Enter your company domain ID"}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Password</label>
            <input
              type={"password"}
              value={password}
              placeholder={"Enter password"}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div id="button" className="row">
            {/* <button onClick={handleLogin}>Log In</button> */}
          </div>
        </div>

        {/* {auth.isError &&
          auth.error &&
          auth.error.response.data &&
          auth.error.response.data.error && (
            <span>
              {" "}
              <span style={{ color: "#EE433C", textTransform: "capitalize" }}>
                {auth.error.response.data.error}
              </span>
            </span>
          )} */}
        {/* {errorMessage && (
          <span style={infoType === "error" ? { color: "red" } : {}}>
            {errorMessage}
          </span>
        )} */}
        <br></br>
        {/* <Link
          style={{ color: "#083864", textAlign: "center" }}
        //   to={PAGE_FORGOT_PASSWORD}
        >
          Forget Password ?
        </Link> */}
        <br></br>
        <footer>
          <div className="footer"> © Powered By Liquet IT Solutions</div>
        </footer>
      </div>

      <div className="dashboard-image"></div>

      {/* {isLoading && (
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )} */}
    </Container>
    <form onSubmit={onFormSubmitHandler}>
            <label>Email Address</label>
            <input 
                type = "text"
                class = "form-control"
                onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
            <input
                type = "text"
                class = "form-control"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Submit</button>    

        </form>
        </>
        
    )

}

export default LoginComponent;


