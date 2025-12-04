import { AuthProvider } from "@/context/authContext";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { AppContent } from "./AppContent";

function Routers() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default Routers;
