import { NavLink } from "react-router";
import useThemeStore from "../store/theme";

function MenuButton(props) {
    const { to, className, label, onClick, type = "button" } = props;
    const darkMode = useThemeStore((state) => state.darkMode);

    const commonClass = `${className} ${darkMode ? 'dark-button' : ''}`;

    // Jika ada properti 'to', maka render sebagai NavLink (untuk navigasi)
    if (to) {
        return (
            <NavLink className={commonClass} to={to}>
                {label}
            </NavLink>
        );
    }

    // Jika tidak ada 'to', render sebagai button biasa (untuk submit/action)
    return (
        <button type={type} className={commonClass} onClick={onClick}>
            {label}
        </button>
    );
}

export default MenuButton;