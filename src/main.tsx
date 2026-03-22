import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';

// Import Components & Pages
import App from './App.tsx';
import MenuList from './pages/MenuList.tsx';
import MenuCreate from './pages/MenuCreate.tsx';
import MenuDetail from './pages/MenuDetail.tsx';
import MenuEdit from './pages/MenuEdit.tsx';
import Layout from './components/Layout.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/menu",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MenuList />,
            },
            {
                path: "create",
                element: <MenuCreate />
            },
            {
                path: ":id",
                element: <MenuDetail />
            },
            {
                path: "edit/:id",
                element: <MenuEdit />
            },
        ]
    },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
