import React from "react";
import StructureSidebar from "./StructureSidebar";
import GuestLayouts from "../../components/layout/GuestLayout";
import { Outlet } from "react-router-dom";

const LayoutsOrganitation = () => {
  return (
    <GuestLayouts>
      <div className="w-full max-w-[88rem] mx-auto flex min-h-screen pt-[80px] pb-2">
        <StructureSidebar />

        <main className="flex-1 p-3 md:p-6">
          <div className="bg-white
           min-h-[80vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </GuestLayouts>
  );
};

export default LayoutsOrganitation;
