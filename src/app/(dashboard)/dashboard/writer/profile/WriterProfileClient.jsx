'use client';

import ChangePasswordSection from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ChangePasswordSection';
import ProfileForm from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ProfileForm';
import ProfileHeader from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ProfileHeader';
import ProfileSkeleton from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ProfileSkeleton';
import PublicProfilePreview from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/PublicProfilePreview';
import { useSession } from '@/lib/auth-client';
import { useState } from 'react';


export default function WriterProfileClient() {
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

    function handleSaved(updated) {
        setLocalOverride(updated);
    }

    return (
        <div className="max-w-4xl">
            <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
                Profile Settings
            </h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Manage how you appear to readers across Fable.
            </p>

            <div className="mt-6">
                <ProfileHeader profile={profile} />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-6">
                    <ProfileForm profile={profile} onSaved={handleSaved} />
                    <ChangePasswordSection />
                </div>

                <div>
                    <PublicProfilePreview
                        writerId={user?.id}
                        avatarUrl={profile.avatarUrl}
                        name={profile.name}
                        bio={profile.bio}
                    />
                </div>
            </div>
        </div>
    );
}
