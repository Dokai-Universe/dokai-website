"use client";

import { useState } from "react";
import * as Styles from "./style.css";
import DashboardSection from "@components/pages/admin/Dashboard";
import MembersSection from "@components/pages/admin/members/Section";
import AdminTabs, { AdminTab } from "@components/pages/admin/Tabs";

// import WorksSection from "./WorksSection";

const AdminPageClient = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("Dashboard");

  return (
    <div className={Styles.Container}>
      <div className={Styles.Header}>
        <div className={Styles.HeaderContent}>
          <p className={Styles.Title}>Admin</p>
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {activeTab === "Dashboard" && <DashboardSection />}
      {activeTab === "Members" && <MembersSection />}
      {/* {activeTab === "Works" && <WorksSection />} */}
    </div>
  );
};

export default AdminPageClient;
