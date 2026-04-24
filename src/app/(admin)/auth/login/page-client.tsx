"use client";

import LoginButton from "./login-button";
import * as Styles from "./style.css";
import LogoSVG from "@assets/dokai.svg";
import { useSearchParams } from "next/navigation";
import useAuthUser from "@hooks/useAuthUser";

const LoginPageClient = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [session] = useAuthUser();

  return (
    <main className={Styles.Layout}>
      <div className={Styles.Container}>
        <LogoSVG className={Styles.Logo} />
        <p className={Styles.Title}>Login</p>

        {!!session ? (
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className={Styles.Button}
          >
            <p className={Styles.ButtonText}>Already Logged In</p>
          </button>
        ) : (
          <LoginButton />
        )}

        {error && (
          <p style={{ color: "red", fontSize: "0.75rem" }}>
            {error === "oauth"
              ? "로그인에 실패했습니다. 다시 시도해주세요."
              : error === "not_allowed"
                ? "허용되지 않은 이메일입니다."
                : error === "no_email"
                  ? "이메일이 없습니다."
                  : ""}
          </p>
        )}

        <p className={Styles.Description}>
          로그인 후에도 접근이 안 되면 허용 목록에 이메일이 등록되어 있는지
          확인하세요.
        </p>
      </div>
    </main>
  );
};

export default LoginPageClient;
