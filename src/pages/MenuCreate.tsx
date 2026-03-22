import { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useThemeStore from "../store/theme";
import MenuButton from "../components/MenuButton";
import "./menu.css";
import type { FormAction, FormState } from "../types/menu";

const initialState: FormState = {
    name: "",
    price: 0,
    category: "food",
    description: "",
};

const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.field]: action.value
            };
        case "RESET_FORM":
            return initialState;
        default:
            return state;
    }
};

const MenuCreate: React.FC = () => {
    const navigate = useNavigate();
    const darkMode = useThemeStore((state) => state.darkMode);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, dispatch] = useReducer(formReducer, initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        const finalValue = name === "price" ? (value === "" ? 0 : Number(value)) : value;

        dispatch({
            type: "CHANGE_INPUT",
            field: name,
            value: finalValue,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post("https://6968be9069178471522b6774.mockapi.io/api/v1/menu", formData)
            .then(() => {
                alert("Menu berhasil ditambahkan!");
                navigate("/menu");
            })
            .catch((err) => {
                console.error(err);
                alert("Terjadi kesalahan.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="container-detail">
            <div className="detail-focus-wrapper">
                <button className="btn-close" onClick={() => navigate("/menu")}>×</button>

                <form className={`menu-card ${darkMode ? "dark" : ""}`} onSubmit={handleSubmit}>
                    <div className="card-body">
                        <h3>Tambah Menu</h3>
                        <div className="form-container">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nama Menu..."
                                className="custom-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Harga..."
                                className="custom-input"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            <select
                                name="category"
                                className="custom-input"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="food">Food</option>
                                <option value="drink">Drink</option>
                                <option value="snack">Snack</option>
                            </select>
                            <textarea
                                name="description"
                                placeholder="Deskripsi..."
                                className="custom-input"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className="card-footer">
                        <MenuButton to="/menu" label="Batal" className="btn-edit-detail" />
                        <MenuButton
                            type="submit"
                            label={loading ? "Proses..." : "Simpan"}
                            className="btn-detail"
                            disabled={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MenuCreate;