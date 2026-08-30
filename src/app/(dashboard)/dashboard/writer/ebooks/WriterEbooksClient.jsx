'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import DashboardError from '@/components/WriterDashboardRelatedCompo/DashboardError';
import EmptyEbooks from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EmptyEbooks';
import EbooksTable from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EbooksTable';
import EbooksCards from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EbooksCards';
import DeleteConfirmDialog from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/DeleteConfirmDialog';
import SummaryStats from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/SummaryStats';
import EbooksToolbar from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/EbooksToolbar';
import { showToast } from '@/lib/toast';
import { deleteBook, updateBook } from '@/action/books';


export default function WriterEbooksClient({ books, user }) {
    const [ebooks, setEbooks] = useState(() => books.filter((book) => book.writerId === user.id));
    const [filters, setFilters] = useState({ search: '', status: '', sort: 'newest' });
    const [updatingId, setUpdatingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const summary = {
        total: ebooks.length,
        published: ebooks.filter((book) => book.publishingStatus === 'published').length,
        unpublished: ebooks.filter((book) => book.publishingStatus === 'unpublished').length,
        totalSales: 0,
    };

    const filterBooks = useMemo(() => {
        return ebooks
            .filter((book) => {
                const matchesSearch =
                    !filters.search ||
                    book.title.toLowerCase().includes(filters.search.toLowerCase());

                const matchesStatus =
                    !filters.status || book.publishingStatus === filters.status;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                if (filters.sort === 'newest') {
                    return new Date(b.uploadedAt) - new Date(a.uploadedAt);
                }
                if (filters.sort === 'oldest') {
                    return new Date(a.uploadedAt) - new Date(b.uploadedAt);
                }
                if (filters.sort === 'price') {
                    return b.price - a.price;
                }
                return 0;
            });
    }, [ebooks, filters]);

    function handleFilterChange(updatedField) {
        setFilters((prev) => ({ ...prev, ...updatedField }));
    }

    async function handleTogglePublish(ebook) {
        const nextStatus = ebook.publishingStatus === 'published' ? 'unpublished' : 'published';

        setUpdatingId(ebook._id);
        try {
            await updateBook(ebook._id, { publishingStatus: nextStatus });
            setEbooks((prev) =>
                prev.map((b) => (b._id === ebook._id ? { ...b, publishingStatus: nextStatus } : b))
            );
            showToast.success(nextStatus === 'published' ? 'Ebook published.' : 'Ebook unpublished.');
        } catch (error) {
            showToast.error('Unable to update this ebook. Please try again.');
        } finally {
            setUpdatingId(null);
        }
    }

    async function handleConfirmDelete() {
        if (!deleteTarget) return;

        setIsDeleting(true);
        try {
            await deleteBook(deleteTarget._id);
            setEbooks((prev) => prev.filter((b) => b._id !== deleteTarget._id));
            showToast.success('Ebook deleted.');
            setDeleteTarget(null);
        } catch (error) {
            showToast.error('Unable to delete this ebook. Please try again.');
        } finally {
            setIsDeleting(false);
        }
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

            <div className="mt-6">
                <SummaryStats summary={summary} />
            </div>

            <div className="mt-6">
                <EbooksToolbar filters={filters} onChange={handleFilterChange} />
            </div>

            <div className="mt-5">
                {filterBooks.length === 0 && <EmptyEbooks />}

                {filterBooks.length > 0 && (
                    <>
                        <EbooksTable
                            ebooks={filterBooks}
                            onTogglePublish={handleTogglePublish}
                            onDelete={setDeleteTarget}
                            updatingId={updatingId}
                        />
                        <EbooksCards
                            ebooks={filterBooks}
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
