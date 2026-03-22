import { useNavigate, useParams } from "react-router";
import { useEffect, useReducer, useState } from "react";
import useThemeStore from "../store/theme";
import MenuButton from "../components/MenuButton";
import "./menu.css";
import axios from "axios";
import type { FormAction, FormState } from "../types/menu";

const API_URL = import.meta.env.VITE_API_URL;

const initialState: FormState = {
    name: "",
    price: 0,
    category: "food",
    description: "",
};

const formReducer = (state: FormState, action: FormAction): FormState => {
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

const MenuEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const darkMode = useThemeStore((state) => state.darkMode);

    const [formData, dispatch] = useReducer(formReducer, initialState);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        axios
            .get(`${API_URL}/${id}`)
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const finalValue = name === "price" ? (value === "" ? 0 : Number(value)) : value;

        dispatch({
            type: "CHANGE_INPUT",
            field: name,
            value: finalValue,
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
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

    if (loading) {
        return (
            <div className="container-detail">
                <p style={{ color: "var(--text-main)" }}>Memuat data menu...</p>
            </div>
        );
    }

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
                                rows={4}
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