// components/dashboard/writer/profile/writer-profile-client.jsx
'use client';

import DashboardError from '@/components/WriterDashboardRelatedCompo/DashboardError';
import ChangePasswordSection from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ChangePasswordSection';
import ProfileForm from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ProfileForm';
import ProfileHeader from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ProfileHeader';
import ProfileSkeleton from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/ProfileSkeleton';
import PublicProfilePreview from '@/components/WriterDashboardRelatedCompo/WriterProfileRelatedCompo/PublicProfilePreview';
import { useSession } from '@/lib/auth-client';
import { useCallback, useEffect, useState } from 'react';
// import { getWriterProfile } from '@/lib/api';


export default function WriterProfileClient() {
    const { data: session } = useSession();
    const user = session?.user;

    const profile= {
        writerId:'writerId',
        avatarUrl:"avatarUrl",
        name:"name",
        bio:"bio"
    };
    const [state, setState] = useState({ status: 'ready', profile: user });

    //   const load = useCallback(async () => {
    //     setState({ status: 'loading', profile: null });
    //     try {
    //       const profile = await getWriterProfile();
    //       setState({ status: 'ready', profile });
    //     } catch {
    //       setState({ status: 'error', profile: null });
    //     }
    //   }, []);

    //   useEffect(() => {
    //     load();
    //   }, [load]);

    if (state.status === 'loading') return <ProfileSkeleton />;
    if (state.status === 'error') return <DashboardError onRetry={load} />;

    

    // function handleSaved(updated) {
    //     setState((prev) => ({ ...prev, profile: { ...prev.profile, ...updated } }));
    // }

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
                    <ProfileForm profile={profile} onSaved={null} />
                    <ChangePasswordSection />
                </div>

                <div>
                    <PublicProfilePreview
                        writerId={profile.id}
                        avatarUrl={profile.image}
                        name={profile.name}
                        bio={profile.bio}
                    />
                </div>
            </div>
        </div>
    );
}