// components/dashboard/writer/ebooks/ebooks-cards.jsx

import EbookRowActions from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EbookRowActions';
import StatusBadge from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/StatusBadge';


export default function EbooksCards({ ebooks, onTogglePublish, onDelete, updatingId }) {
  return (
    <div className="space-y-3 md:hidden">
      {ebooks.map((ebook) => (
        <div key={ebook.id} className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex gap-3">
            <div className="h-20 w-14 shrink-0 overflow-hidden rounded-md bg-[var(--background-secondary)]">
              {ebook.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ebook.coverImage} alt={`Cover of ${ebook.title}`} className="h-full w-full object-cover" />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate font-serif text-sm font-semibold text-[var(--text-primary)]">
                  {ebook.title}
                </p>
                <EbookRowActions
                  ebook={ebook}
                  onTogglePublish={onTogglePublish}
                  onDelete={onDelete}
                  isUpdating={updatingId === ebook.id}
                />
              </div>
              <div className="mt-1.5">
                <StatusBadge status={ebook.status} />
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                ${ebook.price.toFixed(2)} · {ebook.sales} sales
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}