import "./DashboardLayout.css";

function DashboardLayout({ children }) {
    return (
        <div className="dashboard-layout">
            {children}
        </div>
    );
}

export default DashboardLayout;