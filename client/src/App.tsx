import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

import MainPage from "./components/pages/MainPage";
import DashboardPage from "./components/pages/DashboardPage";
import useUserStore from "./context/useUserStore";

function App() {

  const isAllowed = useUserStore((state) => state.isLoggedIn);

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute isAllowed={!isAllowed} redirectTo="/dashboard">
            <MainPage />
          </ProtectedRoute>
        }/>
        <Route path="/dashboard" element={
          <ProtectedRoute isAllowed={isAllowed} redirectTo="/">
            <DashboardPage />
          </ProtectedRoute>
        }/>
        {/* Aquí puedes agregar más rutas protegidas o públicas según sea necesario */}
      </Routes>
    </div>
  );
}

export default App;
