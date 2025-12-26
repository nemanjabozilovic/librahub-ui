import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  language: z.string().min(1, 'Language is required'),
  publisher: z.string().min(1, 'Publisher is required'),
  publicationDate: z.string().min(1, 'Publication date is required'),
  isbn: z.string().min(1, 'ISBN is required'),
  authors: z.array(z.string()).min(1, 'At least one author is required'),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  tags: z.array(z.string()).optional(),
}).refine((data) => {
  return data.authors.every(author => author.trim().length > 0);
}, {
  message: 'Author names cannot be empty',
  path: ['authors'],
}).refine((data) => {
  return data.categories.every(category => category.trim().length > 0);
}, {
  message: 'Category names cannot be empty',
  path: ['categories'],
});

export const updateBookSchema = z.object({
  description: z.string().optional(),
  language: z.string().optional(),
  publisher: z.string().optional(),
  publicationDate: z.string().optional(),
  isbn: z.string().optional(),
  authors: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const setPricingSchema = z.object({
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  currency: z.string().min(1, 'Currency is required'),
  vatRate: z.number().min(0).max(1).optional(),
  promoPrice: z.number().min(0).optional(),
  promoStartDate: z.string().optional(),
  promoEndDate: z.string().optional(),
}).refine((data) => {
  if (data.promoPrice && data.promoPrice >= data.price) {
    return false;
  }
  return true;
}, {
  message: 'Promo price must be less than regular price',
  path: ['promoPrice'],
});

export type CreateBookFormData = z.infer<typeof createBookSchema>;
export type UpdateBookFormData = z.infer<typeof updateBookSchema>;
export type SetPricingFormData = z.infer<typeof setPricingSchema>;

