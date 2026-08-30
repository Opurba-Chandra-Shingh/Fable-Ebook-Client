export default function ProfileHeader({ profile }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border border-[var(--border)] bg-[var(--surface)] p-6 sm:flex-row sm:items-center">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--background-secondary)]">
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-[var(--text-primary)]">
            {profile.name?.[0]?.toUpperCase()}
          </div>
        )}
      </div>

      <div className="text-center sm:text-left">
        <h1 className="font-serif text-xl font-semibold text-[var(--text-primary)]">
          {profile.name}
        </h1>
        <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{profile.email}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <span className="rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2.5 py-1 text-[11px] font-medium capitalize text-[var(--badge-text)]">
            {profile.role}
          </span>
          <span className="text-xs text-[var(--text-secondary)]">
            Member since{' '}
            {new Date(profile.memberSince).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}