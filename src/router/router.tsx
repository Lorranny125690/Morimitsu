import { AuthProvider } from "@/context/authContext";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { AppContent } from "./routers";
import { StudentProvider } from "@/context/studentContext";

function Routers() {
  return (
    <Router>
      <StudentProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </StudentProvider>
    </Router>
  );
}

export default Routers;
