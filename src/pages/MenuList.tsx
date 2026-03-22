import axios from "axios";
import "./menu.css";
import MenuCard from "../components/MenuCard";
import { useEffect, useState } from "react";
import type { Menu } from "../types/menu";

const MenuList: React.FC = () => {
    const [data, setData] = useState<Menu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get<Menu[]>("https://6968be9069178471522b6774.mockapi.io/api/v1/menu")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    
    if (loading) {
        return (
            <div className="container-list">
                <div className="menu-flex-container">
                    <p style={{ color: "var(--text-main)" }}>Memuat menu...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container-list">
                <div className="menu-flex-container">
                    <p style={{ color: "#ef4444" }}>Gagal mengambil data menu. Silakan coba lagi nanti.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-list">
            <div className="menu-flex-container">
                {data.length > 0 ? (
                    data.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))
                ) : (
                    <p style={{ color: "var(--text-muted)" }}>Belum ada menu yang tersedia.</p>
                )}
            </div>
        </div>
    );
}

export default MenuList;