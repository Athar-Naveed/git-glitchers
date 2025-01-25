"use client";
// -------------------------------
// Imports
// -------------------------------
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Eye, EyeOff, Mail, Lock, User, User2Icon, LockKeyhole} from "lucide-react";
import { UserRegisterHandler } from "@/handler/loginHandler";
import stateStore from "@/store/zuStore";
import AuthIntro from "./authIntro";
import * as Yup from "yup";
// -------------------------------
// Register code starts here
// -------------------------------
const Register = () => {
  // -------------------------------
  // Setting var
  // -------------------------------
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>("");
  const {setReglo} = stateStore();
  const route = useRouter();
  // -------------------------------
  // Validation for user registeration form fields
  // -------------------------------
  const registerValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!#%*?&.]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. \nAllowed special characters: @, $, !, %, *, #, ?, &, .",
      ),
    });
    
  return (
    <div className="reglo-form">
      <Formik
        validationSchema={registerValidation}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const resp = await UserRegisterHandler(values);
            if (resp.status == 200) {
              toast.success(resp.message!, {
                duration: 6000,
                position: "top-center",
              });
              setLoading(false);
              route.push("/ml");
            }
            if (resp.status == 409) {
              setMessage("User already exists");
              setLoading(false);
            }
          } catch (error: any) {
            
            setMessage(error);
            setLoading(false);
          }
        }}
      >
        {({values}) => (
          <Form className="space-y-4">
            <AuthIntro />
            
            <div className="relative">
              <Field
                type="email"
                name="email"
                placeholder="info@mindloom.com"
                className="reglo-input-field"
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••"
                className="reglo-input-field"
                required
              />
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-dark-custom-blue" />
                ) : (
                  <EyeOff className="h-5 w-5 text-dark-custom-blue" />
                )}
              </button>
            </div>
            

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-md transition duration-300 ${loading && "bg-gray-500"}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>

      
      {message && (
        <div className="bg-red-500 text-white text-center my-5 p-2">
          <p>{message}</p>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-dark-custom-dark-blue">
        Don't have an account?{" "}
        <button
          onClick={setReglo}
          className="text-dark-custom-dark-blue font-semibold hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;