import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { useLocation, Link } from "react-router-dom";

export function HeaderMobile() {
  const { pathname } = useLocation();
  const role = localStorage.getItem("role");

  const navLinks = [
    {
      icon: <IoHomeSharp size={24} />,
      hrefs: ["/home"],
      roles: ["ADMIN", "TEACHER", "STUDENT"],
    },
    {
      icon: <PiStudentFill size={24} />,
      hrefs: ["/student", "/notification"],
      roles: ["ADMIN", "TEACHER"],
    },
    {
      icon: <SiGoogleclassroom size={24} />,
      hrefs: ["/classes"],
      roles: ["ADMIN", "TEACHER"],
    },
    {
      icon: <RiDashboardHorizontalFill size={24} />,
      hrefs: ["/dashboard"],
      roles: ["ADMIN"],
    },
    {
      icon: <FaUser size={24} />,
      hrefs: ["/profile"],
      roles: ["TEACHER", "STUDENT"],
    },
  ];

  const isDashboard = pathname.startsWith("/dashboard");
  const isProfile = pathname.startsWith("/profile");

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-[86px] flex justify-around items-center z-50 transition-colors duration-300
        ${
          isDashboard
            ? "bg-[#322F50]"
            : isProfile
            ? "bg-[#192443]"
            : "bg-[#7B73C3]/20"
        }
      `}
    >
      {navLinks.map((link, index) => {
        if (!role || !link.roles.includes(role)) return null;

        const isActive = link.hrefs.some((h) =>
          pathname.startsWith(h)
        );

        return (
          <motion.div
            key={index}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to={link.hrefs[0]}
              className={`flex items-center justify-center ${
                isActive
                  ? "text-white border-b-2 border-white pb-1"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {link.icon}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
