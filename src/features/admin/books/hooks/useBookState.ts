import { useState } from 'react';
import type { BookDetails } from '../types';

export type BookActionType = 'create' | 'update' | 'setPricing' | 'publish' | 'unlist' | 'remove' | 'uploadCover' | 'uploadEdition' | null;

export const useBookState = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookDetails | null>(null);
  const [actionType, setActionType] = useState<BookActionType>(null);
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const openAction = (type: BookActionType, book?: BookDetails) => {
    setActionType(type);
    if (book) {
      setSelectedBook(book);
    }
  };

  const closeAction = () => {
    setActionType(null);
    setSelectedBook(null);
    setUploadError(null);
  };

  const toggleExpanded = (bookId: string) => {
    setExpandedBookId(expandedBookId === bookId ? null : bookId);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedBook,
    setSelectedBook,
    actionType,
    setActionType,
    expandedBookId,
    uploadError,
    setUploadError,
    openAction,
    closeAction,
    toggleExpanded,
  };
};

