import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthPage } from "./components/AuthPage";
import { AdminPanel } from "./components/AdminPanel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        <Route path="/admin/*" element={<AdminPanel />}></Route>
      </Routes>
    </>
  );
}

export default App;
