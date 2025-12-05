export {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

export { StudentAdress } from "@/screens/student/screens/add_student/components/studentAdress"
export { useAuth, AuthProvider } from "@/context/authContext";
export { Frequency } from "@/screens/frequency/frequency";
export { Home } from "@/screens/home/home";
export { Login } from "@/screens/auth/login/pages/login";
export { SelectLogin } from "@/screens/auth/userType/pages/userType";
export { HeaderExport } from "@/components/index";
export { Footer } from "@/components/footer";
export { Dashboard } from "@/screens/dashboard/dashboard";
export { StudentScreen } from "@/screens/student/screens/add_student/add";
export { AddClass } from "@/screens/classes/screens/add_classes";
export { Student } from "@/screens/student";
export { Password } from "@/screens/auth/password/pages/password";
export { Code } from "../screens/auth/code/pages/code"
export { Email } from "@/screens/auth/email/pages/email";
export { AnimatePresence, motion } from "framer-motion";
export { StudentNotification } from "@/screens/student/indexNotification";
export { Classes } from "@/screens/classes";
export { Profile } from "@/screens/user";
export { ProfileMobile } from "@/screens/student/screens/profileMobile";
