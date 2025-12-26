import { useCallback } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import {
  createBookThunk,
  updateBookThunk,
  removeBookThunk,
  setPricingThunk,
  publishBookThunk,
  unlistBookThunk,
} from '../../store/adminThunks';
import { updateBook } from '../../store/adminSlice';
import { adminService } from '../../services/adminService';
import type {
  CreateBookRequest,
  UpdateBookRequest,
  RemoveBookRequest,
  SetPricingRequest,
  BookDetails,
} from '../types';

interface UseBookActionsParams {
  selectedBook: BookDetails | null;
  searchQuery: string;
  currentPage: number;
  refreshBooks: (searchTerm?: string, page?: number) => void;
  refreshStatistics: () => void;
  closeAction: () => void;
  setUploadError: (error: string | null) => void;
}

export const useBookActions = ({
  selectedBook,
  searchQuery,
  currentPage,
  refreshBooks,
  refreshStatistics,
  closeAction,
  setUploadError,
}: UseBookActionsParams) => {
  const dispatch = useAppDispatch();

  const createBook = useCallback(async (data: CreateBookRequest): Promise<void> => {
    const result = await dispatch(createBookThunk(data));
    if (createBookThunk.fulfilled.match(result)) {
      closeAction();
      refreshBooks(searchQuery, currentPage);
      refreshStatistics();
    }
  }, [dispatch, searchQuery, currentPage, refreshBooks, refreshStatistics, closeAction]);

  const updateBookAction = useCallback(async (data: UpdateBookRequest): Promise<void> => {
    if (!selectedBook) return;
    const result = await dispatch(updateBookThunk({ bookId: selectedBook.id, data }));
    if (updateBookThunk.fulfilled.match(result)) {
      closeAction();
      refreshBooks(searchQuery, currentPage);
    }
  }, [dispatch, selectedBook, searchQuery, currentPage, refreshBooks, closeAction]);

  const removeBook = useCallback(async (data: RemoveBookRequest): Promise<void> => {
    if (!selectedBook) return;
    const result = await dispatch(removeBookThunk({ bookId: selectedBook.id, data }));
    if (removeBookThunk.fulfilled.match(result)) {
      closeAction();
      refreshBooks(searchQuery, currentPage);
    }
  }, [dispatch, selectedBook, searchQuery, currentPage, refreshBooks, closeAction]);

  const setPricing = useCallback(async (data: SetPricingRequest): Promise<void> => {
    if (!selectedBook) return;
    const result = await dispatch(setPricingThunk({ bookId: selectedBook.id, data }));
    if (setPricingThunk.fulfilled.match(result)) {
      closeAction();
      refreshBooks(searchQuery, currentPage);
    }
  }, [dispatch, selectedBook, searchQuery, currentPage, refreshBooks, closeAction]);

  const publishBook = useCallback(async (bookId: string): Promise<void> => {
    const result = await dispatch(publishBookThunk(bookId));
    if (publishBookThunk.fulfilled.match(result)) {
      refreshBooks(searchQuery, currentPage);
      refreshStatistics();
    }
  }, [dispatch, searchQuery, currentPage, refreshBooks, refreshStatistics]);

  const unlistBook = useCallback(async (bookId: string): Promise<void> => {
    const result = await dispatch(unlistBookThunk(bookId));
    if (unlistBookThunk.fulfilled.match(result)) {
      refreshBooks(searchQuery, currentPage);
      refreshStatistics();
    }
  }, [dispatch, searchQuery, currentPage, refreshBooks, refreshStatistics]);

  const uploadCover = useCallback(async (file: File): Promise<void> => {
    if (!selectedBook) return;
    setUploadError(null);
    try {
      const coverUrl = await adminService.uploadCover(selectedBook.id, file);
      
      dispatch(updateBook({
        ...selectedBook,
        coverUrl: coverUrl,
      }));
      
      closeAction();
      refreshBooks(searchQuery, currentPage);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to upload cover image.';
      setUploadError(errorMessage);
      throw err;
    }
  }, [dispatch, selectedBook, searchQuery, currentPage, refreshBooks, closeAction, setUploadError]);

  const uploadEdition = useCallback(async (file: File, format: string, version?: number): Promise<void> => {
    if (!selectedBook) return;
    setUploadError(null);
    try {
      await adminService.uploadEdition(selectedBook.id, file, format, version);
      closeAction();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to upload edition.';
      setUploadError(errorMessage);
      throw err;
    }
  }, [selectedBook, closeAction, setUploadError]);

  return {
    createBook,
    updateBook: updateBookAction,
    removeBook,
    setPricing,
    publishBook,
    unlistBook,
    uploadCover,
    uploadEdition,
  };
};

