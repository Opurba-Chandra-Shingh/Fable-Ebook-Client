// app/dashboard/reader/layout.jsx
import { redirect } from 'next/navigation';
import UserSidebar from '@/components/UserDashboardRelatedCompo.jsx/UserSidebarContent';
import DashboardHeader from '@/components/WriterDashboardRelatedCompo/DashboardHeader';
import { getUserSession } from '@/session/session';

export default async function ReaderDashboardLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect('/login?redirect=/dashboard/reader');
  }
  if (user.role !== 'reader') {
    redirect('/'); // signed in but wrong role (writer/admin)
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <UserSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          user={user}
          subtitle="Discover new stories, and keep track of what you're reading."
          profileHref="/dashboard/reader/profile"
        />
        <main className="flex-1 px-6 py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  );
}