"use client";

import { type ReactNode } from "react";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { ReCAPTCHASignature } from "@/ui/form/securityVerifier/reCAPTCHASignature";

/**
 * セキュリティ認証情報を取得するコンポーネント
 * @example トークンの取り出し方の例
 * ```tsx
 * const getVerificationCode = useVerify();
 * const token = await getVerificationCode();
 * ```
 */
export const VerifyProvider = ({ children }: { children: ReactNode }) => (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY ?? ""}
      language="ja"
    >
      {children}
      <ReCAPTCHASignature />
    </GoogleReCaptchaProvider>
  );
