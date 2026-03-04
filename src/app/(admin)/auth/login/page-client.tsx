"use client";

import LoginButton from "./login-button";
import * as Styles from "./style.css";
import LogoSVG from "@assets/dokai.svg";
import { useAppQuery } from "@controllers/common";
import { authQueriesClient } from "@controllers/auth/query.client";

const LoginPageClient = () => {
  const { data: session, isLoading } = useAppQuery(
    authQueriesClient.sessionStatus(),
  );

  console.log(session);
  if (isLoading) return null;

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

        <p className={Styles.Description}>
          로그인 후에도 접근이 안 되면 허용 목록에 이메일이 등록되어 있는지
          확인하세요.
        </p>
      </div>
    </main>
  );
};

export default LoginPageClient;
