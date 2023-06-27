import { UserSchema } from '@/components/auth/register-form';
import { useMutation, useQuery } from '@tanstack/react-query';

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

type TokenType = { token: string };

type ApiResponse<DataSchema> = {
  message?: string;
  data: DataSchema;
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

  const parsed: ApiResponse<UserType> = await response.json();
  const user = parsed.data;

  return user;
}

async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<TokenType> {
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

  const data: TokenType = await response.json();

  if (data.token) {
    localStorage.setItem('utk', data.token);
  }

  return data;
}

async function getUser() {
  const token = localStorage.getItem('utk');

  console.log('token is defined as: ', token);

  if (!token) {
    throw new Error('Invalid token.');
  }

  console.log('test');

  const response = await fetch('http://localhost/api/v1/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error('Failed to fetch user.');
  }

  const { data }: ApiResponse<UserType> = await response.json();

  return data;
}

export function useRegister() {
  return useMutation({ mutationFn: registerUser });
}

export function useLogin() {
  return useMutation({ mutationFn: loginUser });
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
}
