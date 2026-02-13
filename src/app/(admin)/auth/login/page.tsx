"use client";

import { useMe } from "@lib/auth/useMe";
import LoginButton from "./login-button";

export default function LoginPage() {
  const { isAuthed, loading } = useMe();

  if (loading) {
    return <div style={{ padding: 32 }}>Loading...</div>;
  }

  return (
    <main style={{ padding: 32 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Login</h1>
      <p style={{ marginBottom: 16 }}>허용된 계정만 로그인할 수 있습니다.</p>

      {isAuthed ? <p>이미 로그인되어 있습니다.</p> : <LoginButton />}

      <p style={{ marginTop: 16, color: "#666" }}>
        로그인 후에도 접근이 안 되면 허용 목록(allowed_users)에 이메일이
        등록되어 있는지 확인하세요.
      </p>
    </main>
  );
}
