'use client';

import { useState } from 'react';
import ChangePasswordSection from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ChangePasswordSection';
import ProfileForm from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ProfileForm';
import ProfileHeader from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ProfileHeader';
import ProfileSkeleton from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ProfileSkeleton';
import { useSession } from '@/lib/auth-client';


export default function ReaderProfileClient() {
    const { data: session, isPending } = useSession();
    const [localOverride, setLocalOverride] = useState(null);

    if (isPending) return <ProfileSkeleton />;

    const user = session?.user;
    const profile = {
        ...user,
        avatarUrl: localOverride?.avatarUrl ?? user?.image,
        name: localOverride?.name ?? user?.name,
        bio: localOverride?.bio ?? user?.bio,
        memberSince: user?.createdAt,
    };

    return (
        <div className="max-w-2xl">
            <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
                Profile Settings
            </h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Manage your account details.
            </p>

            <div className="mt-6">
                <ProfileHeader profile={profile} />
            </div>

            <div className="mt-6 space-y-6">
                <ProfileForm profile={profile} onSaved={setLocalOverride} bioHint="A short bio about yourself." />
                <ChangePasswordSection />
            </div>
        </div>
    );
}
