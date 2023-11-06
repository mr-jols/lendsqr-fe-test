import Header from "./view/header";
import Nav from "./view/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content-wrapper">
        <div className="nav-wrapper">
          <Nav />
        </div>
        <main>
            {children}
        </main>
      </div>
    </div>
  );
}
