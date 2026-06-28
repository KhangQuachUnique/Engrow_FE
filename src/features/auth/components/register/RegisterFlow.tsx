import { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import RegisterEmailStep from "./RegisterEmailStep";
import RegisterOtpStep from "./RegisterOtpStep";
import RegisterProfileStep from "./RegisterProfileStep";

type RegisterStep = "email" | "otp" | "profile";

const REGISTER_TEST_MODE = true;

const STEP_CONTENT: Record<RegisterStep, { description: string; title: string }> =
  {
    email: {
      title: "Start Your Writing Journey",
      description: "Please enter your email.",
    },
    otp: {
      title: "Start Your Writing Journey",
      description: "Please enter the OTP we sent to your email.",
    },
    profile: {
      title: "Start Your Writing Journey",
      description: "Finish your account",
    },
  };

export default function RegisterFlow() {
  const [step, setStep] = useState<RegisterStep>("email");
  const [email, setEmail] = useState("");

  const content = STEP_CONTENT[step];

  return (
    <AuthLayout title={content.title} description={content.description}>
      {step === "email" && (
        <RegisterEmailStep
          testMode={REGISTER_TEST_MODE}
          onSent={(nextEmail) => {
            setEmail(nextEmail);
            setStep("otp");
          }}
        />
      )}

      {step === "otp" && (
        <RegisterOtpStep
          email={email}
          testMode={REGISTER_TEST_MODE}
          onVerified={() => setStep("profile")}
        />
      )}

      {step === "profile" && (
        <RegisterProfileStep email={email} testMode={REGISTER_TEST_MODE} />
      )}
    </AuthLayout>
  );
}
