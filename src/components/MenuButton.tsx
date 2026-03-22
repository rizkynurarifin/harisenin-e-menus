import { NavLink } from "react-router";
import useThemeStore from "../store/theme";

interface MenuButtonProps {
    to?: string;
    className?: string;
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ to, className, label, onClick, type = "button", disabled }) => {
    const darkMode = useThemeStore((state) => state.darkMode);
    const commonClass = `${className} ${darkMode ? 'dark-button' : ''}`;

    if (to) {
        return (
            <NavLink className={commonClass} to={to}>
                {label}
            </NavLink>
        );
    }
    
    return (
        <button type={type} className={commonClass} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
}

export default MenuButton;