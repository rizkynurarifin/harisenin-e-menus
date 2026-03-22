import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router';
import axios from 'axios';
import MenuCard from "../components/MenuCard";
import "./menu.css";

function MenuDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Inisialisasi state sesuai best practice untuk menghindari warning linter
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        axios
            .get(`https://6968be9069178471522b6774.mockapi.io/api/v1/menu/${id}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error("Error fetching detail:", error);
                setIsError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    // Fungsi Hapus Data
    const handleDelete = () => {
        if (window.confirm("Apakah Anda yakin ingin menghapus menu ini?")) {
            setIsDeleting(true);
            axios
                .delete(`https://6968be9069178471522b6774.mockapi.io/api/v1/menu/${id}`)
                .then(() => {
                    alert("Menu berhasil dihapus!");
                    navigate("/menu");
                })
                .catch((error) => {
                    console.error("Error deleting menu:", error);
                    alert("Gagal menghapus menu.");
                })
                .finally(() => {
                    setIsDeleting(false);
                });
        }
    };

    // Handle Kondisi Loading
    if (loading) {
        return (
            <div className="container-detail">
                <p style={{ color: "var(--text-main)" }}>Memuat detail menu...</p>
            </div>
        );
    }

    // Handle Kondisi Error atau Data Tidak Ditemukan
    if (isError || !item) {
        return (
            <div className="container-detail error-page">
                <div className="error-content">
                    <h1 style={{ color: "var(--text-main)" }}>Menu Tidak Ditemukan</h1>
                    <NavLink to="/menu" className="btn-back"> Kembali ke Dashboard</NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="container-detail">
            <div className="detail-focus-wrapper">
                <button className="btn-close" onClick={() => navigate('/menu')}>
                    &times;
                </button>

                <MenuCard 
                    item={item} 
                    isDetail={true} 
                    onDelete={handleDelete} 
                    isDeleting={isDeleting} 
                />
            </div>
        </div>
    );
}

export default MenuDetail;