import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field';
import type { RemoveBookRequest, BookDetails } from '../types';
import { z } from 'zod';

const removeBookSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
});

type RemoveBookFormData = z.infer<typeof removeBookSchema>;

interface RemoveBookFormProps {
  book: BookDetails;
  onSubmit: (data: RemoveBookRequest) => Promise<void>;
  onCancel: () => void;
}

export const RemoveBookForm = ({ book, onSubmit, onCancel }: RemoveBookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RemoveBookFormData>({
    resolver: zodResolver(removeBookSchema),
  });

  const handleFormSubmit = async (data: RemoveBookFormData) => {
    await onSubmit(data as RemoveBookRequest);
    reset();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Remove Book: {book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="reason">
                Reason <span className="text-error">*</span>
              </FieldLabel>
              <Input
                id="reason"
                {...register('reason')}
                placeholder="Enter reason for removing this book"
                required
                disabled={isSubmitting}
              />
              {errors.reason && (
                <p className="text-sm text-error mt-1">
                  {errors.reason.message}
                </p>
              )}
            </Field>
            <Field>
              <div className="flex gap-2">
                <Button type="submit" variant="destructive" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? 'Removing...' : 'Remove Book'}
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

