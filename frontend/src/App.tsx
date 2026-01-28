import "./App.css";
import LoginPage from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import QueuesPage from "./pages/queues";
import QueuePage from "./pages/queue";
import { CookiesProvider } from "react-cookie";
import AdminTemplate from "./templates/admin";
import { AdminLayoutProvider } from "./contexts/adminLayoutContext/provider";
import ConfigPage from "./pages/configPage";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path=""
            element={
              <AdminLayoutProvider>
                <AdminTemplate />
              </AdminLayoutProvider>
            }
          >
            <Route path="/queues" element={<QueuesPage />} />
            <Route path="/config" element={<ConfigPage />} />
          </Route>
          <Route path="/queue/:id" element={<QueuePage />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
