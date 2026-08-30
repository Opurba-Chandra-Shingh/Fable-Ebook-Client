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




export default function WriterEbooksClient({ books, user }) {
    const [filters, setFilters] = useState({ search: '', status: '', sort: 'newest' });
    const [updatingId, setUpdatingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);



    const AllBooksForThisWriter = books.filter(book => user.id === book.writerId);
    const [filterBooks, setFilterBooks] = useState(AllBooksForThisWriter);


    const publishedBooksForThisWriter = AllBooksForThisWriter.filter(book => book.publishingStatus === "published");
    const [publishedBooks, setPublishedBooks] = useState(AllBooksForThisWriter);

    const UnPublishedBooksForThisWriter = AllBooksForThisWriter.filter(book => book.publishingStatus === "unpublished");
    const [unpublishedBooks, setUnpublishedBooks] = useState(AllBooksForThisWriter);

    // console.log("Published books from WriterEbooksClient: ", publishedBooksForThisWriter.length);
    // console.log("UnPublished books from WriterEbooksClient: ", UnPublishedBooksForThisWriter.length);

    const summary = {
        total: AllBooksForThisWriter.length,
        published: publishedBooksForThisWriter.length,
        unpublished: UnPublishedBooksForThisWriter.length,
        totalSales: 0,
    }




    function handleFilterChange(updatedFiled) {
        setFilters((prev) => ({ ...prev, ...updatedFiled }));


        const filteredAndSortedBooks = AllBooksForThisWriter
            .filter((book) => {
                const matchesSearch =
                    !filters.search ||
                    book.title
                        .toLowerCase()
                        .includes(filters.search.toLowerCase());

                const matchesStatus =
                    !filters.status ||
                    book.publishingStatus === filters.status;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                if (filters.sort === 'newest') {
                    return (
                        new Date(b.uploadedAt) -
                        new Date(a.uploadedAt)
                    );
                }

                if (filters.sort === 'oldest') {
                    return (
                        new Date(a.uploadedAt) -
                        new Date(b.uploadedAt)
                    );
                }

                return 0;
            });

        setFilterBooks(filteredAndSortedBooks);

    }

    async function handleTogglePublish(ebook) {
        
    }

    async function handleConfirmDelete() {
       
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

            {summary && (
                <div className="mt-6">
                    <SummaryStats summary={summary} />
                </div>
            )}


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

            {/* <DeleteConfirmDialog
                ebook={deleteTarget}
                isDeleting={isDeleting}
                onCancel={() => setDeleteTarget(null)}
                onConfirm={handleConfirmDelete}
            /> */}
        </div>
    );
}