import type { KeyboardEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import Button from "@/share/components/Button/Button";
import { cn } from "@/share/utils/cn";
import {
  registerOtpSchema,
  type RegisterOtpFormData,
} from "../../schemas/auth";
import { useSendRegisterOtp } from "../../hooks/mutations/useSendRegisterOtp";
import { useVerifyRegisterOtp } from "../../hooks/mutations/useVerifyRegisterOtp";
import { AuthErrorHandler } from "../../utils/authErrors";

interface RegisterOtpStepProps {
  email: string;
  onVerified: () => void;
  testMode?: boolean;
}

export default function RegisterOtpStep({
  email,
  onVerified,
  testMode = false,
}: RegisterOtpStepProps) {
  const verifyOtpMutation = useVerifyRegisterOtp();
  const resendOtpMutation = useSendRegisterOtp();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterOtpFormData>({
    resolver: zodResolver(registerOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otp = useWatch({
    control,
    name: "otp",
  });

  const onSubmit = (data: RegisterOtpFormData) => {
    if (testMode) {
      onVerified();
      return;
    }

    verifyOtpMutation.mutate(
      {
        email,
        otp: data.otp,
      },
      {
        onSuccess: () => onVerified(),
      },
    );
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = otp.padEnd(6, " ").split("");
    nextOtp[index] = digit || " ";

    setValue("otp", nextOtp.join("").replace(/\s/g, ""), {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (digit && index < 5) {
      document.getElementById(`register-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`register-otp-${index - 1}`)?.focus();
    }
  };

  const handleResend = () => {
    resendOtpMutation.mutate({ email });
  };

  const apiError = verifyOtpMutation.error
    ? AuthErrorHandler.getMessage(verifyOtpMutation.error)
    : resendOtpMutation.error
      ? AuthErrorHandler.getMessage(resendOtpMutation.error)
      : "";

  const apiErrorClass = cn(
    "m-0 rounded-xl border border-red-500/20 bg-red-50/85 px-3.5 py-3",
    "font-sans text-[13px] font-medium leading-[18px]",
    "text-red-600",
  );

  const formClass = cn("flex flex-col gap-5");

  const otpGroupClass = cn("grid grid-cols-6 gap-3");

  const otpInputClass = cn(
    "h-[58px] w-full rounded-[18px] border border-border-soft bg-white",
    "text-center font-heading text-2xl font-bold text-text-strong",
    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none",
    "focus:border-brand/80 focus:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_4px_rgba(58,190,249,0.14)]",
    "disabled:cursor-not-allowed disabled:opacity-65",
  );

  const errorClass = cn(
    "font-sans text-[13px] font-medium leading-[18px]",
    "text-red-600",
  );

  const helperClass = cn(
    "m-0 text-center font-sans text-sm font-normal leading-5",
    "text-text-main",
    "[&_button]:ml-1 [&_button]:font-bold [&_button]:text-brand",
    "[&_button]:disabled:cursor-not-allowed [&_button]:disabled:opacity-65",
  );

  return (
    <>
      {apiError && <p className={apiErrorClass}>{apiError}</p>}

      <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
        <div className={otpGroupClass}>
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              id={`register-otp-${index}`}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              className={otpInputClass}
              value={otp[index] || ""}
              disabled={verifyOtpMutation.isPending}
              maxLength={1}
              aria-label={`OTP digit ${index + 1}`}
              onChange={(event) => handleOtpChange(index, event.target.value)}
              onKeyDown={(event) => handleOtpKeyDown(index, event)}
            />
          ))}
        </div>

        {errors.otp && <p className={errorClass}>{errors.otp.message}</p>}

        <Button
          type="submit"
          className="min-h-[50px] w-full px-[22px] py-[11px] font-heading text-lg leading-7"
          disabled={verifyOtpMutation.isPending}
          loading={verifyOtpMutation.isPending}
          loadingText="Verifying">
          Verify Email
        </Button>
      </form>

      <p className={helperClass}>
        Didn&apos;t receive the code?
        <button
          type="button"
          disabled={resendOtpMutation.isPending}
          onClick={handleResend}>
          {resendOtpMutation.isPending ? "Resending" : "Resend code"}
        </button>
      </p>

    </>
  );
}
