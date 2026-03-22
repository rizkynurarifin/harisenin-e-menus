import { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useThemeStore from "../store/theme";
import MenuButton from "../components/MenuButton";
import "./menu.css";

// 1. Initial State
const initialState = {
    name: "",
    price: "",
    category: "food",
    description: "",
};

// 2. Reducer Function
const formReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.field]: action.value,
            };
        case "RESET_FORM":
            return initialState;
        default:
            return state;
    }
};

function MenuCreate() {
    const navigate = useNavigate();
    const darkMode = useThemeStore((state) => state.darkMode);
    const [loading, setLoading] = useState(false);

    // 3. Inisialisasi useReducer
    const [formData, dispatch] = useReducer(formReducer, initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: "CHANGE_INPUT",
            field: name,
            value: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios
            .post("https://6968be9069178471522b6774.mockapi.io/api/v1/menu", formData)
            .then(() => {
                alert("Menu berhasil ditambahkan!");
                navigate("/menu");
            })
            .catch((error) => {
                console.error("Gagal menambah menu:", error);
                alert("Terjadi kesalahan.");
            })
            .finally(() => {
                setLoading(false);
            });
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
                                rows="4"
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