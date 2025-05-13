import { LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

function Header({ setShowLoginForm }) {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <div>
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <User size={16} />
                <span>{currentUser.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
              >
                <LogOut size={16} className="mr-1" /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginForm(true)}
              className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
            >
              <LogIn size={16} className="mr-1" /> Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
