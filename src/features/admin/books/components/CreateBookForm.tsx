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
import type { CreateBookRequest } from '../types';
import { createBookSchema, type CreateBookFormData } from '../validations';

interface CreateBookFormProps {
  onSubmit: (data: CreateBookRequest) => Promise<void>;
  onCancel: () => void;
}

export const CreateBookForm = ({ onSubmit, onCancel }: CreateBookFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateBookFormData>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: '',
      description: '',
      language: '',
      publisher: '',
      isbn: '',
      publicationDate: '',
      authors: [''],
      categories: [''],
      tags: [],
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

  const handleFormSubmit = async (data: CreateBookFormData) => {
    const submitData: CreateBookRequest = {
      ...data,
      authors: data.authors.filter(author => author.trim().length > 0),
      categories: data.categories.filter(category => category.trim().length > 0),
      tags: data.tags?.filter(tag => tag.trim().length > 0),
    };
    await onSubmit(submitData);
    reset();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Book</CardTitle>
        <CardDescription>
          Create a new book in the catalog.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">
                Title <span className="text-error">*</span>
              </FieldLabel>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter book title"
                required
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-sm text-error mt-1">{errors.title.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">
                Description <span className="text-error">*</span>
              </FieldLabel>
              <textarea
                id="description"
                {...register('description')}
                placeholder="Enter book description"
                rows={4}
                required
                disabled={isSubmitting}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.description && (
                <p className="text-sm text-error mt-1">{errors.description.message}</p>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="language">
                  Language <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="language"
                  {...register('language')}
                  placeholder="e.g., en, sr"
                  required
                  disabled={isSubmitting}
                />
                {errors.language && (
                  <p className="text-sm text-error mt-1">{errors.language.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="publisher">
                  Publisher <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="publisher"
                  {...register('publisher')}
                  placeholder="Enter publisher name"
                  required
                  disabled={isSubmitting}
                />
                {errors.publisher && (
                  <p className="text-sm text-error mt-1">{errors.publisher.message}</p>
                )}
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="isbn">
                  ISBN <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="isbn"
                  {...register('isbn')}
                  placeholder="978-0-1234-5678-9"
                  required
                  disabled={isSubmitting}
                />
                {errors.isbn && (
                  <p className="text-sm text-error mt-1">{errors.isbn.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="publicationDate">
                  Publication Date <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="publicationDate"
                  type="date"
                  {...register('publicationDate')}
                  required
                  disabled={isSubmitting}
                />
                {errors.publicationDate && (
                  <p className="text-sm text-error mt-1">{errors.publicationDate.message}</p>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>
                Authors <span className="text-error">*</span>
              </FieldLabel>
              <div className="space-y-2">
                {authorFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`authors.${index}` as const)}
                      placeholder="Author name"
                      required
                      disabled={isSubmitting}
                    />
                    {authorFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeAuthor(index)}
                        disabled={isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
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
              {errors.authors && (
                <p className="text-sm text-error mt-1">{errors.authors.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>
                Categories <span className="text-error">*</span>
              </FieldLabel>
              <div className="space-y-2">
                {categoryFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`categories.${index}` as const)}
                      placeholder="Category name"
                      required
                      disabled={isSubmitting}
                    />
                    {categoryFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeCategory(index)}
                        disabled={isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendCategory('' as any)}
                  disabled={isSubmitting}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
              {errors.categories && (
                <p className="text-sm text-error mt-1">{errors.categories.message}</p>
              )}
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
                  onClick={() => appendTag('' as any)}
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
                  {isSubmitting ? 'Creating...' : 'Create Book'}
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

