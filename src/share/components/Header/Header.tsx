import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600">
          Engrow
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-900 transition-colors">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
