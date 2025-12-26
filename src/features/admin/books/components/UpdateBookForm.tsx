import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import { Plus, X } from 'lucide-react';
import type { UpdateBookRequest, BookDetails } from '../types';
import { updateBookSchema, type UpdateBookFormData } from '../validations';

interface UpdateBookFormProps {
  book: BookDetails;
  onSubmit: (data: UpdateBookRequest) => Promise<void>;
  onCancel: () => void;
}

export const UpdateBookForm = ({ book, onSubmit, onCancel }: UpdateBookFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateBookFormData>({
    resolver: zodResolver(updateBookSchema),
    defaultValues: {
      description: book.description || '',
      language: book.language || '',
      publisher: book.publisher || '',
      publicationDate: book.publicationDate ? book.publicationDate.split('T')[0] : '',
      isbn: book.isbn || '',
      authors: book.authors.length > 0 ? book.authors : [],
      categories: book.categories.length > 0 ? book.categories : [],
      tags: book.tags.length > 0 ? book.tags : [],
    },
  });

  const {
    fields: authorFields,
    append: appendAuthor,
    remove: removeAuthor,
  } = useFieldArray({
    control,
    name: 'authors' as never,
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: 'categories' as never,
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: 'tags' as never,
  });

  const handleFormSubmit = async (data: UpdateBookFormData) => {
    const submitData = {
      ...data,
      publicationDate: data.publicationDate
        ? new Date(data.publicationDate).toISOString()
        : undefined,
    };
    await onSubmit(submitData as UpdateBookRequest);
    reset();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Update Book: {book.title}</CardTitle>
        <CardDescription>
          Update book metadata and information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <textarea
                id="description"
                {...register('description')}
                placeholder="Enter book description"
                rows={4}
                disabled={isSubmitting}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.description && (
                <p className="text-sm text-error mt-1">{errors.description.message}</p>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="language">Language</FieldLabel>
                <Input
                  id="language"
                  {...register('language')}
                  placeholder="e.g., en, sr"
                  disabled={isSubmitting}
                />
                {errors.language && (
                  <p className="text-sm text-error mt-1">{errors.language.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="publisher">Publisher</FieldLabel>
                <Input
                  id="publisher"
                  {...register('publisher')}
                  placeholder="Enter publisher name"
                  disabled={isSubmitting}
                />
                {errors.publisher && (
                  <p className="text-sm text-error mt-1">{errors.publisher.message}</p>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="isbn">ISBN</FieldLabel>
                <Input
                  id="isbn"
                  {...register('isbn')}
                  placeholder="978-0-1234-5678-9"
                  disabled={isSubmitting}
                />
                {errors.isbn && (
                  <p className="text-sm text-error mt-1">{errors.isbn.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="publicationDate">Publication Date</FieldLabel>
                <Input
                  id="publicationDate"
                  type="date"
                  {...register('publicationDate')}
                  disabled={isSubmitting}
                />
                {errors.publicationDate && (
                  <p className="text-sm text-error mt-1">{errors.publicationDate.message}</p>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>Authors</FieldLabel>
              <div className="space-y-2">
                {authorFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`authors.${index}` as const)}
                      placeholder="Author name"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeAuthor(index)}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendAuthor('')}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Author
                </Button>
              </div>
            </Field>

            <Field>
              <FieldLabel>Categories</FieldLabel>
              <div className="space-y-2">
                {categoryFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`categories.${index}` as const)}
                      placeholder="Category name"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeCategory(index)}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendCategory('')}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </Field>

            <Field>
              <FieldLabel>Tags</FieldLabel>
              <div className="space-y-2">
                {tagFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`tags.${index}` as const)}
                      placeholder="Tag name"
                      disabled={isSubmitting}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeTag(index)}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendTag('')}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </div>
            </Field>

            <Field>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update Book'}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
              </div>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

