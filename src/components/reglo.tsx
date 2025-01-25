"use client";
// -------------------------------
// Imports
// -------------------------------
import Register from "./register";
import Login from "./login";
import stateStore from "@/store/zuStore";

// -------------------------------
// Register & Login code starts here
// -------------------------------
const RegloComponent = () => {
  const reglo = stateStore((state) => state.reglo);
  return (
    <>
      <section className="flex items-center justify-center">
        <div className="reglo">{reglo ? <Login /> : <Register />}</div>
      </section>
    </>
  );
};
export default RegloComponent;