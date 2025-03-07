// ----------------------------
// Imports
// ----------------------------
"use client";
import {useRouter} from "next/navigation";
import {Formik, Form, Field} from "formik";
import {Eye, EyeOff, Mail, Lock} from "lucide-react";
import {useState} from "react";
import stateStore from "@/store/zuStore";
import { UserLoginHandler } from "@/handler/loginHandler";
import AuthIntro from "./authIntro";
import toast from "react-hot-toast";
// ----------------------------
// Login code starts here
// ----------------------------
const Login = () => {
  // ----------------------------
  // Setting vars
  // ----------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");
  const setReglo = stateStore((state) => state.setReglo);
  const route = useRouter();
  return (
    <div className="reglo-form">
      <AuthIntro />

      <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const resp = await UserLoginHandler(values);
            if (resp.status === 200) {
              toast.success("Let's Learn!", {
                duration: 3000,
                position: "top-center",
              });
              route.push("/ml");
            }
            else if (resp.status === 401) {
              setMessage(resp?.message);
              setLoading(false);
            }
            
          } catch (error: any) {
            setMessage(error);
          }
        }}
      >
        {() => (
          <Form className="space-y-4">
            <div className="relative">
              <Field
                type="email"
                name="email"
                placeholder="info@mypath.one"
                className="reglo-input-field"
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue" />
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
              {loading ? "Logging in..." : "Login"}
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
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;