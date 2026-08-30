export default function RecentUsers({ users }) {
  const recent = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">Recent Users</h2>

      {!recent.length ? (
        <p className="mt-4 text-sm text-[var(--text-secondary)]">No users yet.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {recent.map((user) => (
            <div key={user._id} className="flex items-center gap-3 rounded-btn border border-[var(--border)] p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--background-secondary)]">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">{user.name}</p>
                <p className="text-xs capitalize text-[var(--text-secondary)]">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
