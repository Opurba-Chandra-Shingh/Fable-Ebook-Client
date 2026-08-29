// components/dashboard/writer/profile/profile-skeleton.jsx
export default function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-28 animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="h-96 animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
        <div className="h-56 animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
      </div>
    </div>
  );
}