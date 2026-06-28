import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  HiOutlineArrowRight,
  HiOutlineAtSymbol,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import Button from "@/share/components/Button";
import Input from "@/share/components/Input";
import { cn } from "@/share/utils/cn";
import { loginSchema, type LoginFormData } from "../../schemas/auth";
import { useLogin } from "../../hooks/mutations/useLogin";
import type { LoginRequestDto } from "../../types/auth.dto";
import { AuthErrorHandler } from "../../utils/authErrors";

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

export default function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    const payload: LoginRequestDto = {
      email: data.email,
      password: data.password,
    };

    loginMutation.mutate(payload);
  };

  const apiError = loginMutation.error
    ? AuthErrorHandler.getMessage(loginMutation.error)
    : "";

  const apiErrorClass = cn(
    "m-0 rounded-xl border border-red-500/20 bg-red-50/85 px-3.5 py-3",
    "font-sans text-[13px] font-medium leading-[18px]",
    "text-red-600",
  );

  const formClass = cn("flex flex-col gap-5");

  const fieldsClass = cn("flex flex-col gap-4");

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

  const signupClass = cn(
    "m-0 pt-1 text-center font-sans text-sm font-normal leading-5",
    "text-text-main",
    "[&_a]:ml-1 [&_a]:font-bold [&_a]:text-brand [&_a]:no-underline",
  );

  return (
    <>
      {apiError && <p className={apiErrorClass}>{apiError}</p>}

      <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldsClass}>
          <Input
            id="email"
            type="email"
            icon={HiOutlineAtSymbol}
            label="Email"
            disabled={loginMutation.isPending}
            error={errors.email?.message}
            placeholder="Enter your email"
            {...register("email")}
          />

          <Input
            id="password"
            type="password"
            icon={HiOutlineLockClosed}
            label="Password"
            disabled={loginMutation.isPending}
            error={errors.password?.message}
            placeholder="••••••••"
            action={<a href="/forgot-password">Forgot password?</a>}
            {...register("password")}
          />
        </div>

        <Button
          type="submit"
          className="min-h-12.5 w-full px-5.5 py-2.75 font-heading text-lg leading-7"
          disabled={loginMutation.isPending}
          iconRight={
            <HiOutlineArrowRight
              aria-hidden="true"
              className={submitIconClass}
            />
          }>
          {loginMutation.isPending ? "Signing in" : "Sign In"}
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
            variant="secondary">
            {provider.label}
          </Button>
        ))}
      </div>

      <p className={signupClass}>
        Don't have an account? <a href="/signup">Sign up for free</a>
      </p>
    </>
  );
}
