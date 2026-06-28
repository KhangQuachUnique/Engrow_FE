import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Button from "@/share/components/Button";
import Input from "@/share/components/Input";
import { appConstants } from "@/share/constants/appConstants";
import { cn } from "@/share/utils/cn";
import {
  registerProfileSchema,
  type RegisterProfileFormData,
} from "../../schemas/auth";
import { useRegister } from "../../hooks/mutations/useRegister";
import type { RegisterRequestDto } from "../../types/auth.dto";
import { AuthErrorHandler } from "../../utils/authErrors";

interface RegisterProfileStepProps {
  email: string;
  testMode?: boolean;
}

export default function RegisterProfileStep({
  email,
  testMode = false,
}: RegisterProfileStepProps) {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProfileFormData>({
    resolver: zodResolver(registerProfileSchema),
    defaultValues: {
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterProfileFormData) => {
    const payload: RegisterRequestDto = {
      email,
      fullName: data.fullName,
      password: data.password,
    };

    if (testMode) {
      navigate(appConstants.DASHBOARD, { replace: true });
      return;
    }

    registerMutation.mutate(payload);
  };

  const apiError = registerMutation.error
    ? AuthErrorHandler.getMessage(registerMutation.error)
    : "";

  const apiErrorClass = cn(
    "m-0 rounded-xl border border-red-500/20 bg-red-50/85 px-3.5 py-3",
    "font-sans text-[13px] font-medium leading-[18px]",
    "text-red-600",
  );

  const formClass = cn("flex flex-col gap-5");

  const fieldsClass = cn("flex flex-col gap-4");

  return (
    <>
      {apiError && <p className={apiErrorClass}>{apiError}</p>}

      <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldsClass}>
          <Input
            id="register-full-name"
            icon={HiOutlineUser}
            label="Full name"
            disabled={registerMutation.isPending}
            error={errors.fullName?.message}
            placeholder="Enter your full name"
            {...register("fullName")}
          />

          <Input
            id="register-password"
            type="password"
            icon={HiOutlineLockClosed}
            label="Password"
            disabled={registerMutation.isPending}
            error={errors.password?.message}
            placeholder="Enter your password"
            {...register("password")}
          />

          <Input
            id="register-confirm-password"
            type="password"
            icon={HiOutlineLockClosed}
            label="Confirm password"
            disabled={registerMutation.isPending}
            error={errors.confirmPassword?.message}
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />
        </div>

        <Button
          type="submit"
          className="min-h-[50px] w-full px-[22px] py-[11px] font-heading text-lg leading-7"
          disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Signing up" : "Sign up"}
        </Button>
      </form>
    </>
  );
}
