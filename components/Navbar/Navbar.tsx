import { Darkmode } from "./Navbar_Components/Darkmode";
import Logo from "./Navbar_Components/Logo";
import Profile from "./Navbar_Components/Profile";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/30 dark:bg-black/60 backdrop-blur-md shadow-md border-b border-white/20 dark:border-black/20">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Logo />
        {/* User controls */}
        <div className="flex items-center space-x-4">
          <Darkmode />
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
