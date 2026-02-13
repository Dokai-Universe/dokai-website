"use client";

import { createSupabaseBrowserClient } from "@lib/supabase/browser";

export default function LogoutButton() {
  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 12px",
        border: "1px solid #ddd",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}
