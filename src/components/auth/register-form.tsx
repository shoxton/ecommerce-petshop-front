import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GithubIcon, Loader2Icon } from 'lucide-react';
import { useRegister } from '@/hooks/use-auth';
import { Checkbox } from '../ui/checkbox';
import { useRouter } from 'next/router';

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface UserSchema {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  is_marketing: boolean;
}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const registerMutation = useRegister();
  const router = useRouter();
  const { isLoading, isSuccess, isError, error } = registerMutation;

  const [newUser, setNewUser] = React.useState<UserSchema>({
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    is_marketing: false,
  });

  const hasTypedEmail = !!newUser.email.length;

  function handleFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    registerMutation.mutate(newUser);
  }

  if (isSuccess) {
    router.push('/dashboard/overview');
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid">
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
              value={newUser.email}
              name="email"
            />
          </div>
          {hasTypedEmail && (
            <>
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <Label className="sr-only" htmlFor="firstName">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    type="text"
                    disabled={isLoading}
                    onChange={handleFieldChange}
                    value={newUser.first_name}
                    name="first_name"
                  />
                </div>
                <div>
                  <Label className="sr-only" htmlFor="lastName">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    type="text"
                    disabled={isLoading}
                    onChange={handleFieldChange}
                    value={newUser.last_name}
                    name="last_name"
                  />
                </div>
              </div>
              <div className="grid">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  disabled={isLoading}
                  name="password"
                  value={newUser.password}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="grid">
                <Label className="sr-only" htmlFor="passwordConfirm">
                  Password confirmation
                </Label>
                <Input
                  id="passwordConfirm"
                  placeholder="Password confirmation"
                  type="password"
                  disabled={isLoading}
                  name="password_confirmation"
                  value={newUser.password_confirmation}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="flex gap-3 items-start my-4">
                <Checkbox
                  checked={newUser.is_marketing}
                  onCheckedChange={(checked) =>
                    setNewUser({ ...newUser, is_marketing: !!checked })
                  }
                  name="is_marketing"
                  id="isMarketing"
                />
                <div className="flex flex-col gap-1">
                  <Label htmlFor="isMarketing">Subscribe to newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about our latest deals and discounts
                  </p>
                </div>
              </div>
            </>
          )}
          {isError && (
            <div className="bg-red-100 text-red-900 text-sm">
              {error.message}
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Create account
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
