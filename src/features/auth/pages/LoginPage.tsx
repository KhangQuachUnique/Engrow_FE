import LoginForm from "../components/login/LoginForm";
import AuthLayout from "../layouts/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Please enter your details to sign in.">
      <LoginForm />
    </AuthLayout>
  );
}
