import axios from "axios";
import "./menu.css";
import MenuCard from "../components/MenuCard";
import { useEffect, useState } from "react";

function MenuList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        axios
            .get("https://6968be9069178471522b6774.mockapi.io/api/v1/menu")
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

    // 1. Handle Kondisi Loading
    if (loading) {
        return (
            <div className="container-list">
                <div className="menu-flex-container">
                    <p style={{ color: "var(--text-main)" }}>Memuat menu...</p>
                </div>
            </div>
        );
    }

    // 2. Handle Kondisi Error
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
                {/* 3. Handle Kondisi Data Kosong */}
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