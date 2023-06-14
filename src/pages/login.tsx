import { LoginForm } from '@/components/auth/login-form';
import { buttonVariants } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex-1 flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-slate-200 md:h-full"></div>
        <main className="flex-1 flex-col overflow-hidden p-4">
          <div className="sm:w-[400px] m-auto space-y-6">
            <div className="flex flex-col text-center space-y-2">
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                Login
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your email and password below to sign in your account
              </p>
            </div>
            <LoginForm />
          </div>
        </main>
      </div>
    </AuthLayout>
  );
}
