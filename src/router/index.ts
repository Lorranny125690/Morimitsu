export {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

export { useAuth, AuthProvider } from "@/context/authContext";

export { Home } from "@/screens/home/home";
export { Login } from "@/screens/auth/login";
export { SelectLogin } from "@/screens/auth/userType";
export { HeaderExport } from "@/components/index";
export { Footer } from "@/components/footer";
export { Dashboard } from "@/screens/dashboard/dashboard";
export { StudentScreen } from "@/screens/student/screens/add";
export { AddClass } from "@/screens/classes/screens/add_classes";
export { Student } from "@/screens/student";
export { Password } from "@/screens/auth/changePassword";
export { Code } from "@/screens/auth/code";
export { Email } from "@/screens/auth/emailVerification";
export { AnimatePresence, motion } from "framer-motion";
export { StudentNotification } from "@/screens/student/indexNotification";
export { Classes } from "@/screens/classes";
export { Profile } from "@/screens/user";
export { ProfileMobile } from "@/screens/student/screens/profileMobile";
