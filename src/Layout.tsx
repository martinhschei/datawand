import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <main id="layout" className="p-4 h-screen">
            <Outlet />
        </main>
    );
}