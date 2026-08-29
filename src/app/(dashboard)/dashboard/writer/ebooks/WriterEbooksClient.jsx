// components/dashboard/writer/ebooks/my-ebooks-client.jsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import EbooksSkeleton from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EbooksSkeleton';
import DashboardError from '@/components/WriterDashboardRelatedCompo/DashboardError';
import EmptyEbooks from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EmptyEbooks';
import EbooksTable from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EbooksTable';
import EbooksCards from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EbooksCards';
import DeleteConfirmDialog from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/DeleteConfirmDialog';
import SummaryStats from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/SummaryStats';
import EbooksToolbar from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EbooksToolbar';






// lib/dummy-writer-ebooks.js
// Temporary dummy data — matches the shape returned by getWriterEbooks()
// Use this to preview SummaryStats, EbooksToolbar, EbooksTable, EbooksCards
// before the real /api/dashboard/writer/ebooks endpoint is ready.

export const dummyWriterEbooks = {
  summary: {
    total: 9,
    published: 6,
    unpublished: 3,
    totalSales: 342,
  },

  items: [
    {
      id: 'ebook_1',
      title: 'Glasshouse Kingdom',
      coverImage: '/images/books/glasshouse-kingdom.jpg',
      genre: 'Fantasy',
      price: 8.75,
      status: 'published',
      sales: 128,
      createdAt: '2026-05-12',
    },
    {
      id: 'ebook_2',
      title: 'The Weight of Almost',
      coverImage: '/images/books/weight-of-almost.jpg',
      genre: 'Poetry',
      price: 6.5,
      status: 'published',
      sales: 96,
      createdAt: '2026-04-03',
    },
    {
      id: 'ebook_3',
      title: 'Slow Craft',
      coverImage: '/images/books/slow-craft.jpg',
      genre: 'Self Development',
      price: 6.99,
      status: 'published',
      sales: 74,
      createdAt: '2026-03-21',
    },
    {
      id: 'ebook_4',
      title: 'Nine Minutes Past',
      coverImage: null,
      genre: 'Thriller',
      price: 10.25,
      status: 'published',
      sales: 21,
      createdAt: '2026-06-08',
    },
    {
      id: 'ebook_5',
      title: 'Cartographers of the Long Road',
      coverImage: '/images/books/cartographers.jpg',
      genre: 'History',
      price: 12.0,
      status: 'published',
      sales: 15,
      createdAt: '2026-07-02',
    },
    {
      id: 'ebook_6',
      title: 'The House Listens Back',
      coverImage: null,
      genre: 'Horror',
      price: 10.99,
      status: 'published',
      sales: 8,
      createdAt: '2026-07-19',
    },
    {
      id: 'ebook_7',
      title: 'Monsoon, Interrupted (Draft)',
      coverImage: '/images/books/monsoon-interrupted.jpg',
      genre: 'Romance',
      price: 7.99,
      status: 'unpublished',
      sales: 0,
      createdAt: '2026-08-15',
    },
    {
      id: 'ebook_8',
      title: 'Untitled Mystery Project',
      coverImage: null,
      genre: 'Mystery',
      price: 9.5,
      status: 'unpublished',
      sales: 0,
      createdAt: '2026-08-20',
    },
    {
      id: 'ebook_9',
      title: 'The Last Winter Protocol — Revised',
      coverImage: '/images/books/last-winter-protocol.jpg',
      genre: 'Science Fiction',
      price: 13.5,
      status: 'unpublished',
      sales: 0,
      createdAt: '2026-08-25',
    },
  ],
};

// // Extra export for testing the empty-library state
// export const dummyWriterEbooksEmpty = {
//   summary: { total: 0, published: 0, unpublished: 0, totalSales: 0 },
//   items: [],
// };




export default function WriterEbooksClient() {
    const [filters, setFilters] = useState({ search: '', status: '', sort: 'newest' });
    const [state, setState] = useState({ status: 'ready', items: dummyWriterEbooks.items, summary: dummyWriterEbooks.summary });
    const [updatingId, setUpdatingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);



    //   const load = useCallback(async () => {
    //     setState((prev) => ({ ...prev, status: 'loading' }));
    //     try {
    //       const data = await getWriterEbooks(filters);
    //       setState({ status: 'ready', items: data.items, summary: data.summary });
    //     } catch {
    //       setState({ status: 'error', items: [], summary: null });
    //     }
    //   }, [filters]);

    //   useEffect(() => {
    //     load();
    //   }, [load]);

    function handleFilterChange(next) {
        // setFilters((prev) => ({ ...prev, ...next }));
    }

    async function handleTogglePublish(ebook) {
        // const nextStatus = ebook.status === 'published' ? 'unpublished' : 'published';
        // setUpdatingId(ebook.id);
        // try {
        //     await updateEbookStatus(ebook.id, nextStatus);
        //     setState((prev) => ({
        //         ...prev,
        //         items: prev.items.map((e) => (e.id === ebook.id ? { ...e, status: nextStatus } : e)),
        //     }));
        //     showToast.success(
        //         nextStatus === 'published' ? 'Ebook published successfully.' : 'Ebook unpublished.'
        //     );
        // } catch {
        //     showToast.error('Something went wrong. Please try again.');
        // } finally {
        //     setUpdatingId(null);
        // }
    }

    async function handleConfirmDelete() {
        // if (!deleteTarget) return;
        // setIsDeleting(true);
        // try {
        //     await deleteEbook(deleteTarget.id);
        //     setState((prev) => ({
        //         ...prev,
        //         items: prev.items.filter((e) => e.id !== deleteTarget.id),
        //         summary: prev.summary && { ...prev.summary, total: prev.summary.total - 1 },
        //     }));
        //     showToast.success('Ebook deleted.');
        //     setDeleteTarget(null);
        // } catch {
        //     showToast.error('Something went wrong. Please try again.');
        // } finally {
        //     setIsDeleting(false);
        // }
    }

    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
                        My Ebooks
                    </h1>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Manage, publish, and track the stories you&apos;ve created.
                    </p>
                </div>

                <Link
                    href="/dashboard/writer/ebooks/new"
                    className="flex items-center gap-1.5 self-start rounded-btn bg-[var(--button-primary-bg)] px-4 py-2.5 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
                >
                    <Plus size={16} />
                    Add Ebook
                </Link>
            </div>

            {state.summary && (
                <div className="mt-6">
                    <SummaryStats summary={state.summary} />
                </div>
            )}
            

            <div className="mt-6">
                <EbooksToolbar filters={filters} onChange={handleFilterChange} />
            </div>

            <div className="mt-5">
                {state.status === 'loading' && <EbooksSkeleton />}

                {state.status === 'error' && <DashboardError onRetry={load} />}

                {state.status === 'ready' && state.items.length === 0 && <EmptyEbooks />}

                {state.status === 'ready' && state.items.length > 0 && (
                    <>
                        <EbooksTable
                            ebooks={state.items}
                            onTogglePublish={handleTogglePublish}
                            onDelete={setDeleteTarget}
                            updatingId={updatingId}
                        />
                        <EbooksCards
                            ebooks={state.items}
                            onTogglePublish={handleTogglePublish}
                            onDelete={setDeleteTarget}
                            updatingId={updatingId}
                        />
                    </>
                )}
            </div>

            <DeleteConfirmDialog
                ebook={deleteTarget}
                isDeleting={isDeleting}
                onCancel={() => setDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}