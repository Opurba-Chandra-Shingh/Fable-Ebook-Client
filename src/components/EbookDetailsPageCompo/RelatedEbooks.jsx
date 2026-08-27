// components/ebook/related-ebooks.jsx
'use client';

import { motion } from 'framer-motion';
import BookCard from '../Shared/BookCard';

export default function RelatedEbooks({relatedBooks}) {
    // console.log("related book from compo: ", relatedBooks);
  return (
    <section className="mt-16">
      <h2 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
        You may also like
      </h2>

      {relatedBooks.length === 0 || relatedBooks.length === 1 ? (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">
            No Related Book Found!
          </h3>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {relatedBooks.map((book, i) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}