import { cn } from '@/shared/lib/utils';
import type { BookDetails, BookStatus } from '../types';

export const getBookStatusBadge = (status: BookStatus) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
  switch (status) {
    case 'Published':
      return (
        <span className={cn(
          baseClasses,
          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
        )}>
          Published
        </span>
      );
    case 'Draft':
      return (
        <span className={cn(
          baseClasses,
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
        )}>
          Draft
        </span>
      );
    case 'Unlisted':
      return (
        <span className={cn(
          baseClasses,
          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
        )}>
          Unlisted
        </span>
      );
    case 'Removed':
      return (
        <span className={cn(
          baseClasses,
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        )}>
          Removed
        </span>
      );
    default:
      return <span className={baseClasses}>{status}</span>;
  }
};

export const filterBooks = (books: BookDetails[], searchQuery: string): BookDetails[] => {
  if (!searchQuery.trim()) return books;
  const query = searchQuery.toLowerCase();
  return books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(query);
    const authorMatch = book.authors.some(author => author.toLowerCase().includes(query));
    const descriptionMatch = book.description?.toLowerCase().includes(query);
    const isbnMatch = book.isbn?.toLowerCase().includes(query);
    
    return titleMatch || authorMatch || descriptionMatch || isbnMatch;
  });
};

export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

export const formatAuthors = (authors: string[]): string => {
  if (authors.length === 0) return 'Unknown';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return authors.join(' and ');
  return `${authors.slice(0, -1).join(', ')}, and ${authors[authors.length - 1]}`;
};

