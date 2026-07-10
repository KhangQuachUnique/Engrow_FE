import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineAtSymbol, HiOutlinePaperAirplane } from "react-icons/hi2";
import Button from "@/share/components/Button";
import Input from "@/share/components/Input";
import { appConstants } from "@/share/constants/appConstants";
import { cn } from "@/share/utils/cn";
import {
  registerEmailSchema,
  type RegisterEmailFormData,
} from "../../schemas/auth";
import { useSendRegisterOtp } from "../../hooks/mutations/useSendRegisterOtp";
import { AuthErrorHandler } from "../../utils/authErrors";
import { useNavigate } from "react-router-dom";

const SOCIAL_PROVIDERS = [
  {
    icon: FcGoogle,
    label: "Google",
  },
  {
    icon: FaFacebook,
    label: "Facebook",
  },
] as const;

interface RegisterEmailStepProps {
  onSent: (email: string) => void;
  testMode?: boolean;
}

export default function RegisterEmailStep({
  onSent,
  testMode = false,
}: RegisterEmailStepProps) {
  const sendOtpMutation = useSendRegisterOtp();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
    const redirectUri = `${window.location.origin}/oauth2/redirect`;
    window.location.href = `${baseUrl}/oauth2/authorization/google?redirect_uri=${redirectUri}`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterEmailFormData>({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: RegisterEmailFormData) => {
    if (testMode) {
      onSent(data.email);
      return;
    }

    sendOtpMutation.mutate(
      {
        email: data.email,
      },
      {
        onSuccess: () => onSent(data.email),
      },
    );
  };

  const apiError = sendOtpMutation.error
    ? AuthErrorHandler.getMessage(sendOtpMutation.error)
    : "";

  const apiErrorClass = cn(
    "m-0 rounded-xl border border-red-500/20 bg-red-50/85 px-3.5 py-3",
    "font-sans text-[13px] font-medium leading-[18px]",
    "text-red-600",
  );

  const formClass = cn("flex flex-col gap-5");

  const submitIconClass = cn("h-5 w-5");

  const dividerClass = cn(
    "relative flex justify-center",
    "font-sans text-xs font-medium leading-4",
    "text-text-muted/80",
    "before:absolute before:left-0 before:right-0 before:top-2",
    "before:h-px before:bg-border-subtle",
  );

  const dividerTextClass = cn("relative z-10 bg-white px-4");

  const socialRowClass = cn(
    "grid grid-cols-2 gap-4",
    "max-[560px]:grid-cols-1",
  );

  const socialIconClass = cn("h-5 w-5 flex-none");

  const signinClass = cn(
    "m-0 pt-1 text-center font-sans text-sm font-normal leading-5",
    "text-text-main",
    "[&_a]:ml-1 [&_a]:font-bold [&_a]:text-brand [&_a]:no-underline",
  );

  return (
    <>
      {apiError && <p className={apiErrorClass}>{apiError}</p>}

      <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="register-email"
          type="email"
          icon={HiOutlineAtSymbol}
          label="Email"
          disabled={sendOtpMutation.isPending}
          error={errors.email?.message}
          placeholder="Enter your email"
          {...register("email")}
        />

        <Button
          type="submit"
          className="min-h-[50px] w-full px-[22px] py-[11px] font-heading text-lg leading-7"
          disabled={sendOtpMutation.isPending}
          iconRight={
            <HiOutlinePaperAirplane
              aria-hidden="true"
              className={submitIconClass}
            />
          }>
          {sendOtpMutation.isPending ? "Sending OTP" : "Send OTP"}
        </Button>
      </form>

      <div className={dividerClass}>
        <span className={dividerTextClass}>OR CONTINUE WITH</span>
      </div>

      <div className={socialRowClass}>
        {SOCIAL_PROVIDERS.map((provider) => (
          <Button
            key={provider.label}
            className="min-h-11 rounded-xl px-4 py-2.5 font-sans text-sm font-semibold leading-5"
            iconLeft={
              <provider.icon aria-hidden="true" className={socialIconClass} />
            }
            onClick={provider.label === "Google" ? handleGoogleLogin : undefined}
            variant="secondary">
            {provider.label}
          </Button>
        ))}
      </div>

      <p className={signinClass}>
        Already have an account?{" "}
        <span
          onClick={() => navigate(appConstants.LOGIN)}
          className="cursor-pointer font-bold text-brand hover:underline">
          Sign in
        </span>
      </p>
    </>
  );
}
