import { useNavigate, useParams } from "react-router";
import { useEffect, useReducer, useState } from "react";
import useThemeStore from "../store/theme";
import MenuButton from "../components/MenuButton";
import "./menu.css";
import axios from "axios";

// 1. Initial State
const initialState = {
    name: "",
    price: "",
    category: "",
    description: "",
};

// 2. Reducer Function
const formReducer = (state, action) => {
    switch (action.type) {
        case "FILL_FORM":
            return { ...action.payload };
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.field]: action.value,
            };
        default:
            return state;
    }
};

function MenuEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const darkMode = useThemeStore((state) => state.darkMode);

    const [formData, dispatch] = useReducer(formReducer, initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // 3. Fetch Data Awal (Read)
    useEffect(() => {
        axios
            .get(`https://6968be9069178471522b6774.mockapi.io/api/v1/menu/${id}`)
            .then((res) => {
                dispatch({ type: "FILL_FORM", payload: res.data });
            })
            .catch((err) => {
                setError(err.response?.data || "Data menu tidak ditemukan!");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: "CHANGE_INPUT",
            field: name,
            value: value,
        });
    };

    // 4. Handle Update (Put)
    const handleUpdate = (e) => {
        e.preventDefault();
        setIsUpdating(true);

        axios
            .put(`https://6968be9069178471522b6774.mockapi.io/api/v1/menu/${id}`, formData)
            .then(() => {
                alert("Menu berhasil diperbarui!");
                navigate("/menu");
            })
            .catch((err) => {
                console.error("Error:", err);
                alert("Gagal mengupdate menu.");
            })
            .finally(() => {
                setIsUpdating(false);
            });
    };

    // --- 1. Kondisi JIKA LOADING ---
    if (loading) {
        return (
            <div className="container-detail">
                <p style={{ color: "var(--text-main)" }}>Memuat data menu...</p>
            </div>
        );
    }

    // --- 2. Kondisi JIKA ERROR (Data tidak ketemu) ---
    if (error) {
        return (
            <div className="container-detail">
                <div className="detail-focus-wrapper">
                    <div className="menu-card" style={{ textAlign: "center", padding: "20px" }}>
                        <h2 style={{ color: "#ef4444" }}>Ups! Terjadi Kesalahan</h2>
                        <p style={{ marginBottom: "20px" }}>{error}</p>
                        <MenuButton to="/menu" label="Kembali ke Daftar Menu" className="btn-edit-detail" />
                    </div>
                </div>
            </div>
        );
    }

    // --- 3. Tampilan Normal (Jika data ada) ---
    return (
        <div className="container-detail">
            <div className="detail-focus-wrapper">
                <button className="btn-close" onClick={() => navigate("/menu")}>×</button>

                <form className={`menu-card ${darkMode ? "dark" : ""}`} onSubmit={handleUpdate}>
                    <div className="card-body">
                        <h3>Edit Menu #{id}</h3>
                        <div className="form-container">
                            <label className="form-label">Nama Menu</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="custom-input"
                                required
                            />

                            <label className="form-label">Kategori</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="custom-input"
                                required
                            >
                                <option value="" disabled>Pilih Kategori</option>
                                <option value="food">Food</option>
                                <option value="drink">Drink</option>
                                <option value="snack">Snack</option>
                            </select>

                            <label className="form-label">Harga (Rp)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="custom-input"
                                required
                            />

                            <label className="form-label">Deskripsi</label>
                            <textarea
                                name="description"
                                className="custom-input"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className="card-footer">
                        <MenuButton to="/menu" label="Batal" className="btn-delete" />
                        <MenuButton
                            type="submit"
                            label={isUpdating ? "Mengupdate..." : "Update"}
                            className="btn-edit-detail"
                            disabled={isUpdating}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MenuEdit;