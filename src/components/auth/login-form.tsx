import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GithubIcon, Loader2Icon } from 'lucide-react';
import { useLogin } from '@/hooks/use-auth';
import { useRouter } from 'next/router';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface CredentialsSchema {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const loginMutation = useLogin();
  const router = useRouter();

  const { isLoading, isSuccess, isError, error } = loginMutation;

  const [form, setForm] = React.useState<CredentialsSchema>({
    email: '',
    password: '',
  });

  function handleFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    loginMutation.mutate(form);
  }

  if (isSuccess) {
    router.push('/dashboard/overview');
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleFieldChange}
              value={form.email}
              name="email"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              disabled={isLoading}
              name="password"
              value={form.password}
              onChange={handleFieldChange}
            />
          </div>
          {isError && (
            <div className="bg-red-100 text-red-900 text-sm">
              {error.message}
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GithubIcon className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </Button>
    </div>
  );
}
