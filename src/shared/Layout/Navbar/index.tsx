// import { ToggleModeButton } from "../ToggleModeButton";
// import { DesktopNav } from "./DesktopNav";
// import { LoaderBar } from "./LoaderBar";
// import { MobileNav } from "./MobileNav";
// import { useAuthStore } from "modules/auth/application";
// import { Link, useNavigate } from "shared/Router";
// import { useNotImplementedYetToast } from "shared/Toast";

export const Navbar = () => {
  // const { isOpen, onToggle } = useDisclosure();

  return (
    <nav className="w-full fixed z-10">
      <div className="w-full min-h-60 py-2 px-4 border-b-1 border-solid border-gray-200 flex align-center bg-gray-800">
        Nav
      </div>
    </nav>
  );
};

// const SignInButton = () => {
//   const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

//   if (isAuthenticated) {
//     return null;
//   }

//   return (
//     <Button fontWeight={400} variant="link" as={Link} to="/sign-in">
//       Sign In
//     </Button>
//   );
// };

// const SignUpButton = () => {
//   const notImplemented = useNotImplementedYetToast();
//   const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

//   if (isAuthenticated) {
//     return null;
//   }

//   return (
//     <Button
//       display={{ base: "none", md: "inline-flex" }}
//       colorScheme="orange"
//       onClick={notImplemented}
//     >
//       Sign Up
//     </Button>
//   );
// };

// const LogoutButton = () => {
//   const navigate = useNavigate();

//   const isAuthenticated = useAuthStore((store) => store.isAuthenticated);
//   const logout = useAuthStore((store) => store.logout);

//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     <Button
//       fontWeight={400}
//       variant="link"
//       onClick={() => logout().then(() => navigate("/"))}
//     >
//       Logout
//     </Button>
//   );
// };
