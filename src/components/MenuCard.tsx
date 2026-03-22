import useThemeStore from "../store/theme";
import type { Menu } from "../types/menu";
import MenuButton from "./MenuButton";

interface MenuCardProps {
    item: Menu;
    isDetail?: boolean;
    onDelete?: () => void;
    isDeleting?: boolean;
}
const MenuCard: React.FC<MenuCardProps> = ({ item, isDetail = false, onDelete, isDeleting }) => {
    const darkMode = useThemeStore((state) => state.darkMode);

    return (
        <div className={`menu-card ${darkMode ? 'dark' : ''} ${isDetail ? 'focused' : ''}`}>
            <div className="card-top">
                <span className="badge">{item.category}</span>
            </div>

            <div className="card-body">
                <h3>{item.name}</h3>
                <p className="menu-price">Rp {item.price}</p>
                <p className="menu-desc">{item.description}</p>
            </div>

            <div className="card-footer">
                {isDetail ? (
                    <>
                        <MenuButton
                            to={`/menu/edit/${item.id}`}
                            className="btn-edit-detail"
                            label="Edit"
                            disabled={isDeleting}
                        />
                        
                        <MenuButton
                            className="btn-delete"
                            label={isDeleting ? "Menghapus..." : "Hapus"} 
                            onClick={onDelete}
                            disabled={isDeleting}
                        />
                    </>
                ) : (
                    <>
                        <MenuButton
                            to={`/menu/${item.id}`}
                            className="btn-detail"
                            label="Detail"
                        />
                        <MenuButton
                            to={`/menu/edit/${item.id}`}
                            className="btn-edit"
                            label="Edit"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default MenuCard;