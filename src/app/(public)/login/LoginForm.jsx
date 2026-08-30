// components/login-form.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from '@heroui/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from '@/lib/auth-client';
import { showToast } from '@/lib/toast';
import { useRouter, useSearchParams } from 'next/navigation';



const ROLE_REDIRECTS = {
  reader: '/dashboard/reader',
  writer: '/dashboard/writer',
  admin: '/dashboard/admin',
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const email = String(data.email || '').trim();
    const password = String(data.password || '');

    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        throw new Error(error.message || 'Unable to sign in.');
      }

      if (data) {
        showToast.success('Welcome back to Fable.');
        const redirectTo = searchParams.get('redirect');
        router.push(redirectTo || ROLE_REDIRECTS[data.user?.role] || '/');
        router.refresh();
      }
    } catch (err) {
      const message = err?.message === 'Invalid email or password'
        ? 'Email or password is incorrect.'
        : (err?.message || 'Something went wrong. Please try again.');

      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setFormError('');
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: 'google', callbackURL: '/' });
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
      setIsGoogleLoading(false);
    }
  }

  const isBusy = isSubmitting || isGoogleLoading;

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-serif text-3xl font-medium text-[var(--text-primary)]">
        Welcome back.
      </h1>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Continue your reading journey with Fable.
      </p>

      {formError && (
        <div
          role="alert"
          className="mt-6 rounded-input border border-red-300/50 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {formError}
        </div>
      )}

      <Form
        onSubmit={handleSubmit}
        validationBehavior="native"
        className="mt-6 flex flex-col gap-5"
      >
        {/* Email */}
        <TextField
          name="email"
          type="email"
          isRequired
          autoComplete="email"
          isDisabled={isBusy}
          className="flex flex-col gap-1.5"
        >
          <Label className="text-sm font-medium text-[var(--text-primary)]">
            Email
          </Label>
          <Input
            placeholder="you@example.com"
            className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:opacity-60 data-[invalid]:border-red-400"
          />
          <FieldError className="text-xs text-red-500" />
        </TextField>

        {/* Password */}
        <TextField
          name="password"
          type={showPassword ? 'text' : 'password'}
          isRequired
          autoComplete="current-password"
          isDisabled={isBusy}
          className="flex flex-col gap-1.5"
        >
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-[var(--text-primary)]">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Input
              placeholder="••••••••"
              className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 pr-11 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:opacity-60 data-[invalid]:border-red-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <FieldError className="text-xs text-red-500" />
        </TextField>

        <Button
          type="submit"
          isDisabled={isBusy}
          className="flex w-full items-center justify-center gap-2 rounded-btn bg-[var(--button-primary-bg)] px-4 py-3 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </Form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
          Or
        </span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <Button
        type="button"
        onPress={handleGoogleLogin}
        isDisabled={isBusy}
        className="flex w-full items-center justify-center gap-3 rounded-btn border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGoogleLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <FcGoogle size={18} />
        )}
        Continue with Google
      </Button>

      <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}