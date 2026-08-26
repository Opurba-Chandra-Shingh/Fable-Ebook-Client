
'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from '@heroui/react';
import { Eye, EyeOff, Loader2, BookOpen, PenLine, Check } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from '@/lib/auth-client';


const ROLE_REDIRECTS = {
  reader: '/dashboard/user',
  writer: '/dashboard/writer',
};

const ROLES = [
  {
    value: 'reader',
    label: 'Reader',
    description: 'Discover, purchase, bookmark, and read ebooks.',
    icon: BookOpen,
  },
  {
    value: 'writer',
    label: 'Writer',
    description: 'Publish your stories and reach new readers.',
    icon: PenLine,
  },
];

function getPasswordStrength(password) {
  if (!password) return { label: '', level: 0 };

  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { label: 'Weak', level: 1 };
  if (score <= 3) return { label: 'Medium', level: 2 };

  return { label: 'Strong', level: 3 };
}

const STRENGTH_STYLES = {
  1: { bars: 1, color: 'bg-red-500', text: 'text-red-500' },
  2: { bars: 2, color: 'bg-amber-500', text: 'text-amber-500' },
  3: { bars: 3, color: 'bg-emerald-500', text: 'text-emerald-500' },
};

export default function RegisterForm() {
  //   const router = useRouter();
  //   const searchParams = useSearchParams();
  //   const { register, loginWithGoogle } = useAuth();

  const [role, setRole] = useState('reader');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const confirmError = confirmPassword && password !== confirmPassword
    ? 'Passwords do not match.'
    : '';

  function redirectAfterRegister(selectedRole) {
    const redirectTo = searchParams.get('redirect');
    const destination = redirectTo || ROLE_REDIRECTS[selectedRole] || '/dashboard/user';

    router.push(destination);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setFormError('');

    if (isSubmitting) return;

    if (!confirmPassword || password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const fullName = String(formData.fullName || '').trim();
    const image = String(formData.image || '').trim();
    const email = String(formData.email || '').trim();
    const selectedRole = String(formData.role || 'reader');

    if (!fullName) {
      setFormError('Full name is required.');
      return;
    }

    if (!email) {
      setFormError('Email is required.');
      return;
    }

    if (!password) {
      setFormError('Password is required.');
      return;
    }

    console.log('Register Data:', {
      fullName,
      image,
      email,
      password,
      role: selectedRole,
    });

    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: fullName,
        image,
        email,
        password,
        role: selectedRole,
      });

      if (error) {
        console.error('Signup Error:', error);
        throw new Error(error.message || 'Unable to create your account.');
      }

      console.log('Signup Success:', data);

      alert('Signup successful!');

      // redirectAfterRegister(data?.user?.role || selectedRole);
    } catch (error) {
      console.error('Signup Error:', error);

      setFormError(error?.message || 'Unable to create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignup() {
    setFormError('');
    setIsGoogleLoading(true);

    try {
      const { role: assignedRole } = await loginWithGoogle();

      showToast.success('Welcome to Fable.');
      redirectAfterRegister(assignedRole || 'reader');
    } catch (err) {
      setFormError('Unable to create your account. Please try again.');
      showToast.error('Unable to create your account. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  }

  const isBusy = isSubmitting || isGoogleLoading;

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-serif-display text-3xl font-medium text-[var(--text-primary)]">
        Start your story.
      </h1>

      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Join Fable as a reader or share your own stories with the world.
      </p>

      {formError && (
        <div role="alert" className="mt-6 rounded-input border border-red-300/50 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {formError}
        </div>
      )}

      <Form onSubmit={handleSubmit} validationBehavior="native" className="mt-6 flex flex-col gap-5">

        {/* Full Name */}
        <TextField name="fullName" type="text" isRequired minLength={2} autoComplete="name" isDisabled={isBusy} className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[var(--text-primary)]">
            Full name
          </Label>

          <Input placeholder="Amara Osei" className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:opacity-60 data-[invalid]:border-red-400" />

          <FieldError className="text-xs text-red-500" />
        </TextField>



        {/* image */}
        <TextField name="image" type="text" autoComplete="image" isDisabled={isBusy} className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[var(--text-primary)]">
            Image link
          </Label>

          <Input placeholder="link" className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:opacity-60 data-[invalid]:border-red-400" />

          <FieldError className="text-xs text-red-500" />
        </TextField>




        {/* Email */}
        <TextField name="email" type="email" isRequired autoComplete="email" isDisabled={isBusy} className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[var(--text-primary)]">
            Email
          </Label>

          <Input placeholder="you@example.com" className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:opacity-60 data-[invalid]:border-red-400" />

          <FieldError className="text-xs text-red-500" />
        </TextField>


        {/* Password */}
        <TextField name="password" type={showPassword ? 'text' : 'password'} isRequired minLength={8} value={password} onChange={setPassword} autoComplete="new-password" isDisabled={isBusy} className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[var(--text-primary)]">
            Password
          </Label>

          <div className="relative">
            <Input placeholder="••••••••" className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 pr-11 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:opacity-60 data-[invalid]:border-red-400" />

            <button type="button" onClick={() => setShowPassword((prev) => !prev)} tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <FieldError className="text-xs text-red-500" />

          {password && (
            <div className="mt-1" aria-live="polite">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((bar) => (
                  <div key={bar} className={`h-1 flex-1 rounded-full transition-colors ${strength.level >= bar ? STRENGTH_STYLES[strength.level]?.color : 'bg-[var(--border)]'}`} />
                ))}
              </div>

              <p className={`mt-1.5 text-xs font-medium ${STRENGTH_STYLES[strength.level]?.text || 'text-[var(--text-secondary)]'}`}>
                {strength.label} password
              </p>
            </div>
          )}
        </TextField>


        {/* Confirm Password */}
        <TextField name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} isRequired value={confirmPassword} onChange={setConfirmPassword} autoComplete="new-password" isInvalid={!!confirmError} className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[var(--text-primary)]">
            Confirm password
          </Label>

          <div className="relative">
            <Input placeholder="••••••••" className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 pr-11 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:opacity-60 data-[invalid]:border-red-400" />

            <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} tabIndex={-1} aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {confirmError ? (
            <p className="text-xs text-red-500">{confirmError}</p>
          ) : (
            <FieldError className="text-xs text-red-500" />
          )}
        </TextField>


        {/* Role Selector */}
        <div>
          <span className="text-sm font-medium text-[var(--text-primary)]">
            I want to join as
          </span>

          <div role="radiogroup" aria-label="Account role" className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ROLES.map(({ value, label, description, icon: Icon }) => {
              const isSelected = role === value;

              return (
                <button key={value} type="button" role="radio" aria-checked={isSelected} onClick={() => setRole(value)} disabled={isBusy} className={`relative flex flex-col items-start gap-2 rounded-card border p-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${isSelected ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50'}`}>
                  <div className="flex w-full items-center justify-between">
                    <Icon size={18} className={isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'} />

                    {isSelected && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)]">
                        <Check size={11} className="text-white" strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {label}
                  </span>

                  <span className="text-xs leading-relaxed text-[var(--text-secondary)]">
                    {description}
                  </span>
                </button>
              );
            })}
          </div>

          <input type="hidden" name="role" value={role} />
        </div>


        {/* Create Account */}
        <Button type="submit" isDisabled={isBusy} className="flex w-full items-center justify-center gap-2 rounded-btn bg-[var(--button-primary-bg)] px-4 py-3 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
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


      {/* Google Signup */}
      <Button type="button" onPress={handleGoogleSignup} isDisabled={isBusy} className="flex w-full items-center justify-center gap-3 rounded-btn border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)] disabled:cursor-not-allowed disabled:opacity-60">
        {isGoogleLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <FcGoogle size={18} />
        )}

        Continue with Google
      </Button>

      <p className="mt-2 text-center text-xs text-[var(--text-secondary)]">
        Signing up with Google? You can choose or confirm your role during onboarding.
      </p>


      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
        Already have an account?{' '}

        <Link href="/login" className="font-medium text-[var(--accent)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}