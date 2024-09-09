import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthPage } from "./components/AuthPage";
import { AdminPanel } from "./components/AdminPanel";
import { RequireAuth } from "./components/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        <Route element={<RequireAuth />}>
          <Route path="/admin/*" element={<AdminPanel />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
