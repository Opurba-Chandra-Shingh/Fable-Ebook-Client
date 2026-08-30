// components/dashboard/writer/ebooks/ebooks-table.jsx
import StatusBadge from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/StatusBadge';
import EbookRowActions from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EbookRowActions';


export default function EbooksTable({ ebooks, onTogglePublish, onDelete, updatingId }) {
  return (
    <div className="hidden overflow-x-auto rounded-card border border-[var(--border)] bg-[var(--surface)] md:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
            <th className="px-5 py-3 font-medium">Cover</th>
            <th className="px-3 py-3 font-medium">Title</th>
            <th className="px-3 py-3 font-medium">Genre</th>
            <th className="px-3 py-3 font-medium">Price</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">Sales</th>
            <th className="px-3 py-3 font-medium">Created</th>
            <th className="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ebooks.map((ebook) => (
            <tr key={ebook._id} className="border-b border-[var(--border)] last:border-0">
              <td className="px-5 py-3">
                <div className="h-14 w-10 overflow-hidden rounded-md bg-[var(--background-secondary)]">
                  {ebook.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ebook.coverImage} alt={`Cover of ${ebook.title}`} className="h-full w-full object-cover" />
                  ) : null}
                </div>
              </td>
              <td className="px-3 py-3 font-medium text-[var(--text-primary)]">{ebook.title}</td>
              <td className="px-3 py-3 text-[var(--text-secondary)]">{ebook.genre}</td>
              <td className="px-3 py-3 text-[var(--text-primary)]">${ebook.price}</td>
              <td className="px-3 py-3"><StatusBadge status={ebook.publishingStatus} /></td>
              <td className="px-3 py-3 text-[var(--text-secondary)]">salesCount</td>
              <td className="px-3 py-3 text-[var(--text-secondary)]">
                {new Date(ebook.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td className="px-5 py-3 text-right">
                {/* <EbookRowActions
                  ebook={ebook}
                  onTogglePublish={onTogglePublish}
                  onDelete={onDelete}
                  isUpdating={updatingId === ebook.id}
                /> */}
                row actions
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}