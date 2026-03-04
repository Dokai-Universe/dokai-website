import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ProfileFormInput } from "./career";
import EditPublished from "@components/ui/Edit/EditPublished/EditPublished";
import TitleInput from "@components/ui/Edit/TitleInput/TitleInput";
import * as Styles from "./style.css";
import { fetchProfileCheckEmail } from "@controllers/careers/fetch";
import { useAppQuery } from "@controllers/common";
import { authQueriesClient } from "@controllers/auth/query.client";

type CheckState = "idle" | "checking" | "ok";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (v: string) => v.trim().toLowerCase();

const CareerEditInfo = ({ email }: { email?: string }) => {
  const { data: session } = useAppQuery(authQueriesClient.sessionStatus());
  const form = useFormContext<ProfileFormInput>();
  const emailEditable = session?.role === "admin";

  const {
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = form;

  const [checkState, setCheckState] = useState<CheckState>("idle");

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const baseEmail = useMemo(
    () => (email ? normalizeEmail(email) : undefined),
    [email],
  );

  const setStateSafe = (next: CheckState) => {
    if (mountedRef.current) setCheckState(next);
  };

  const handleEmailChange = () => {
    if (checkState !== "idle") setCheckState("idle");

    if (errors.email?.type === "manual") {
      clearErrors("email");
    }
  };

  const handleCheckEmail = async () => {
    if (!emailEditable) return;
    if (checkState === "checking") return;

    const raw = getValues("email") ?? "";
    const nextEmail = normalizeEmail(raw);

    if (!nextEmail) {
      setError("email", { type: "manual", message: "Email is required" });
      setStateSafe("idle");
      return;
    }

    if (!EMAIL_REGEX.test(nextEmail)) {
      setError("email", { type: "manual", message: "Invalid email" });
      setStateSafe("idle");
      return;
    }

    if (baseEmail && nextEmail === baseEmail) {
      clearErrors("email");
      setStateSafe("ok");
      return;
    }

    setStateSafe("checking");

    try {
      const result = await fetchProfileCheckEmail(nextEmail);

      if (!mountedRef.current) return;

      if (result.exists) {
        setError("email", {
          type: "manual",
          message: "This email is already in use",
        });
        setStateSafe("idle");
        return;
      }

      clearErrors("email");
      setStateSafe("ok");
    } catch {
      if (!mountedRef.current) return;
      setError("email", {
        type: "manual",
        message: "Email check failed",
      });
      setStateSafe("idle");
    }
  };

  const buttonText =
    checkState === "checking"
      ? "Checking..."
      : checkState === "ok"
        ? "Checked"
        : "Check";

  const buttonDisabled = !emailEditable || checkState !== "idle";

  return (
    <section className={Styles.EditInfoContainer}>
      <div className={Styles.EditInfoEmailContainer}>
        <TitleInput
          title="Email"
          form={form}
          name="email"
          disabled={!emailEditable}
          onChange={handleEmailChange}
        />
        {emailEditable && (
          <button
            type="button"
            onClick={handleCheckEmail}
            disabled={buttonDisabled}
            className={Styles.EditInfoEmailButton}
          >
            {buttonText}
          </button>
        )}
      </div>

      <TitleInput title="Name" form={form} name="name" />
      <TitleInput title="Role" form={form} name="role" />
      <EditPublished form={form} name="isPublished" />
    </section>
  );
};

export default CareerEditInfo;
