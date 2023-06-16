import { UserSchema } from '@/components/auth/register-form';
import { useMutation } from '@tanstack/react-query';

type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  address: string | null;
  phone_number: string | null;
  is_marketing: boolean;
  token?: string;
};

type ApiResponse = {
  message?: string;
  data: UserType;
};

async function registerUser(newUser: UserSchema): Promise<UserType> {
  const response = await fetch('http://localhost/api/v1/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error('Failed to register user.');
  }

  const parsed: ApiResponse = await response.json();
  const user = parsed.data;

  return user;
}

async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<{ token: string }> {
  const response = await fetch('http://localhost/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  console.log(response);

  if (response.status === 401) {
    throw new Error('Invalid credentials.');
  }

  if (!response.ok) {
    throw new Error('Failed to login user.');
  }

  const parsed = await response.json();

  return parsed;
}

export function useRegister() {
  return useMutation({ mutationFn: registerUser });
}

export function useLogin() {
  return useMutation({ mutationFn: loginUser });
}
