import './index.css'
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MenuList from './pages/MenuList.jsx';
import MenuCreate from './pages/MenuCreate.jsx';
import MenuDetail from './pages/MenuDetail.jsx';
import MenuEdit from './pages/MenuEdit.jsx';
import Layout from './components/Layout.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        Component: App
    },
    {
        path: "/menu",
        Component: Layout,
        children: [
            {
                index: true,
                Component: MenuList,
            },
            {
                path: "create",
                Component: MenuCreate
            },
            {
                path: ":id",
                Component: MenuDetail
            },
            {
                path: "edit/:id",
                Component: MenuEdit
            },
        ]
    },

]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />,
);
