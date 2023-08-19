import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex gap-4">
      <div className="flex py-12 min-w-[200px] bg-slate-100 shadow min-h-screen">
        <div className="flex flex-col px-2 gap-2 w-full">
          <Link to={"contact"} className="hover:bg-white p-2 rounded">
            Contacts
          </Link>
          <Link to={"charts-and-maps"} className="hover:bg-white p-2 rounded">
            Charts {"&"} Maps
          </Link>
        </div>
      </div>
      <div className="p-3">
        <Outlet />
      </div>
    </div>
  );
}
