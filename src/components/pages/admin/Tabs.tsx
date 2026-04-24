"use client";

import * as Styles from "./style.css";

export type AdminTab = "Dashboard" | "Members" | "Works";

const TAB_LIST: AdminTab[] = ["Dashboard", "Members", "Works"];

const AdminTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}) => {
  return (
    <div className={Styles.TabContainer}>
      {TAB_LIST.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`${Styles.TabItem} ${
            activeTab === tab ? Styles.TabItemActive : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;
