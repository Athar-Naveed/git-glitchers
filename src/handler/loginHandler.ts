// ----------------------
// Imports
// ----------------------
import Cookies from "js-cookie";
import axios from "axios";
// ----------------------
// Registering user
// ----------------------
export const UserRegisterHandler = async (values: any) => {
  try {
    const res = await axios.post("/api/register", values);
    const data = res.data;
    return {
      message: res.data.message + ". Redirecting you to OTP page",
      status: res.status,
      data: data,
    };
  } catch (error: any) {
    // ----------------------
    // You can also check for error.response for better error details if needed
    // ----------------------
    return {error: error.message, status: error.response ? error.response.status : 500};
  }
};

// ----------------------
// Logging user in
// ----------------------
export const UserLoginHandler = async (values: any) => {
  
  try {
    const res = await axios.post("/api/login", values);
    const data = res.data;
    
    Cookies.set("serviceToken", data.token);
  
    return {message: "Success Logging in", status: res.status, data: data};
  } catch (error: any) {
    // ----------------------
    // You can also check for error.response for better error details if needed
    // ----------------------
    
    if (error.response.status == 401) {
      return {
        message: "Incorrect email or password!",
        status: error.response ? error.response.status : 401,
      };
    }
    else if (error.response.status === 403){
      return {
        message: "Please verify your email! Redirecting you to OTP page.",
        status: error.response ? error.response.status : 403,
      }
    }
    return {message: error, status: error.response ? error.response.status : 500};
  }
};
