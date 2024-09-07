import LoginForm from "@/app/ui/auth/login-form";

export default function LoginPage() {
  return (
    <div className="bg-white p-[16px] rounded-[10px] flex gap-4 flex-col items-center">
      <h2>Log In</h2>
      <LoginForm />
    </div>
  );
}
