import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your ChironHedge account to access professional financial research tools',
};

export default function LoginPage() {
  return <LoginClient />;
}