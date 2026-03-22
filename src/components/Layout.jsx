import { Outlet, NavLink } from "react-router";
import "./header.css";
import { useEffect } from "react";
import useThemeStore from "../store/theme";

function Layout() {
    const darkMode = useThemeStore((state) => state.darkMode);
    const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className={`layout-wrapper ${darkMode ? "dark" : ""}`}>
            <nav className="navbar">
                <div className="navbar-container">
                    <NavLink to="/menu" className="navbar-logo">
                        🍽️ E-Menu
                    </NavLink>

                    <ul className="nav-links">
                        <li>
                            <NavLink
                                to="/menu"
                                end
                                className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/menu/create"
                                className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
                            >
                                Tambah Menu
                            </NavLink>
                        </li>
                    </ul>

                    <div className="nav-profile">
                        {/* Tombol switch menggunakan toggleDarkMode */}
                        <button className="theme-toggle" onClick={toggleDarkMode}>
                            {darkMode ? "☀️" : "🌙"}
                        </button>
                        <div className="profile-info">
                            <span>Admin Mode</span>
                            <div className="profile-dot"></div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="content-area">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;