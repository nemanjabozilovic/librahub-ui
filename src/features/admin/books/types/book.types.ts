export type BookStatus = 'Draft' | 'Published' | 'Unlisted' | 'Removed';

export interface BookDetails {
  id: string;
  title: string;
  description?: string;
  language?: string;
  publisher?: string;
  publicationDate?: string;
  isbn?: string;
  status: BookStatus;
  authors: string[];
  categories: string[];
  tags: string[];
  pricing?: {
    price: number;
    currency: string;
    vatRate?: number;
    promoPrice?: number;
    promoStartDate?: string;
    promoEndDate?: string;
  };
  coverUrl?: string;
}

export interface BooksListResponse {
  books: BookDetails[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface RemoveBookRequest {
  reason: string;
}

export interface BookStatistics {
  total: number;
  published: number;
  draft: number;
  unlisted: number;
  newLast30Days: number;
}

export interface CreateBookRequest {
  title: string;
  description?: string;
  language?: string;
  publisher?: string;
  publicationDate?: string;
  isbn?: string;
  authors?: string[];
  categories?: string[];
  tags?: string[];
}

export interface UpdateBookRequest {
  description?: string;
  language?: string;
  publisher?: string;
  publicationDate?: string;
  isbn?: string;
  authors?: string[];
  categories?: string[];
  tags?: string[];
}

export interface SetPricingRequest {
  price: number;
  currency: string;
  vatRate?: number;
  promoPrice?: number;
  promoStartDate?: string;
  promoEndDate?: string;
}

