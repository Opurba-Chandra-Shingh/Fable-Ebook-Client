import { redirect } from 'next/navigation';

import WriterSidebar from '@/components/WriterDashboardRelatedCompo/WriterSidebar';
import DashboardHeader from '@/components/WriterDashboardRelatedCompo/DashboardHeader';
import { getUserSession } from '@/session/session';

export default async function WriterDashboardLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect('/login?redirect=/dashboard/writer');
  }
  if (user.role !== 'writer') {
    redirect('/'); // signed in but wrong role
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <WriterSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader user={user} />
        <main className="flex-1 px-6 py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  );
}