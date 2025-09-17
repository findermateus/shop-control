import { authenticateManager } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { login, password } = await req.json();
  const response = await authenticateManager(login, password);

  if (response.success === false) {
    return NextResponse.json({ error: response.message }, { status: 401 });
  }

  const { token } = response;

  (await cookies()).set('token', token!, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.json({ success: true });
}

