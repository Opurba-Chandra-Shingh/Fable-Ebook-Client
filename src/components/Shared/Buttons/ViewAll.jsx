import React from 'react';
import { MdChevronRight } from 'react-icons/md';

const ViewAll = () => {
    return (
        <div className="text-sm font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent)] flex items-center">
            View all
            <MdChevronRight />
        </div>
    );
};

export default ViewAll;