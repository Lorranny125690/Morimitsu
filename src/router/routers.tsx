
import { PutStudentScreen } from "@/screens/student/screens/putStudent";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useAuth,
  Home,
  Login,
  SelectLogin,
  HeaderExport,
  Footer,
  Dashboard,
  StudentScreen,
  AddClass,
  Student,
  Password,
  Code,
  Email,
  AnimatePresence,
  motion,
  StudentNotification,
  Classes,
  Profile,
  ProfileMobile,
  Frequency,
  StudentClassList,
} from "./index";
import ClassDesktop from "@/screens/classes/screens/class";
import { ClassStudents } from "@/screens/classes/screens/student";
import { BeltConfigDesktop } from "@/screens/user/belts/belts";

/* -----------------------------------------------------------
   AppContent — controla layout e regras de acesso
----------------------------------------------------------- */
export function AppContent() {
  const location = useLocation();
  const { authState, authReady } = useAuth();
  const token = authState?.token;

  if (!authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-lg">
        Carregando...
      </div>
    );
  }

  const noHeaderRoutes = ["/", "/login", "/password", "/code", "/email", "/add_student", "/add_classes", "/profileMobile", "/frequency", "/add_student_adress"];
  const isEditStudent = location.pathname.startsWith("/edit_student/");
  const isEditStudent2 = location.pathname.startsWith("/enturmar/");
  const isEditStudent3 = location.pathname.startsWith("/frequency/");
  const showHeader = !noHeaderRoutes.includes(location.pathname) && !isEditStudent2 && !isEditStudent3 && !isEditStudent;

  const privateRoutes = [
    "/home",
    "/dashboard",
    "/student",
    "/notification",
    "/classes",
    "/championship",
    "/add_student",
    "/add_classes",
    "/profile",
    "/add_student_adress",
    "/classStudent",
  ];

  if (privateRoutes.includes(location.pathname) && !token) {
    return <Navigate to="/" replace />;
  }

  if ((location.pathname === "/" || location.pathname === "/login") && token) {
    return <Navigate to="/home" replace />;
  }

  //detecta se é uma rota pública
  const isPublic = ["/", "/login", "/password", "/code", "/email"].includes(location.pathname);

  if (isPublic) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0D0C15] text-white">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<SelectLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/password" element={<Password />} />
            <Route path="/code" element={<Code />} />
            <Route path="/email" element={<Email />} />
          </Routes>
        </main>
      </div>
    );
  }

  // ✅ Para rotas privadas — com animação
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col min-h-screen bg-[#0D0C15] text-white"
      >
        {showHeader && <HeaderExport />}

        <main className="flex-grow">
          <Routes location={location} key={location.pathname}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student" element={<Student />} />
            <Route path="/notification" element={<StudentNotification />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/add_student" element={<StudentScreen />} />
            <Route path="/add_classes" element={<AddClass />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/profileMobile" element={<ProfileMobile/>} />
            <Route path="/frequency/:id" element={<Frequency/>} />
            <Route path="/classStudent" element={<StudentClassList/>}/>
            <Route path="/edit_student/:id" element={<PutStudentScreen />} />
            <Route path="/class" element={<ClassDesktop />} />
            <Route path="/enturmar/:id" element={<ClassStudents />} />
            <Route path="/belts" element={<BeltConfigDesktop/>}/>
            <Route
              path="*"
              element={<Navigate to={token ? "/home" : "/login"} replace />}
            />
          </Routes>
        </main>

        {showHeader && <Footer />}
      </motion.div>
    </AnimatePresence>
  );
}