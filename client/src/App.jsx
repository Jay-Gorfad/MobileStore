import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return <BrowserRouter>
    <UserRoutes />
    <AdminRoutes />
  </BrowserRouter>;
}

export default App
