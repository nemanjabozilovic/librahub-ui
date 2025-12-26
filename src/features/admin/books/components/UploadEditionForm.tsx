import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import type { BookDetails } from '../types';
import { Upload, X } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const uploadEditionSchema = z.object({
  format: z.enum(['Pdf', 'Epub'], {
    required_error: 'Format is required',
  }),
  version: z.string().optional(),
});

type UploadEditionFormData = z.infer<typeof uploadEditionSchema>;

interface UploadEditionFormProps {
  book: BookDetails;
  onSubmit: (file: File, format: string, version?: number) => Promise<void>;
  onCancel: () => void;
}

export const UploadEditionForm = ({ book, onSubmit, onCancel }: UploadEditionFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    watch,
  } = useForm<UploadEditionFormData>({
    resolver: zodResolver(uploadEditionSchema),
    defaultValues: {
      format: 'Pdf',
    },
  });

  const selectedFormat = watch('format');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = selectedFormat === 'Pdf' 
        ? ['application/pdf']
        : ['application/epub+zip', 'application/epub'];
      
      if (!validTypes.includes(file.type)) {
        setError(`Invalid file type. Please upload a ${selectedFormat.toUpperCase()} file.`);
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError('File size must be less than 100MB.');
        return;
      }
      setError(null);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (data: UploadEditionFormData) => {
    if (!selectedFile) {
      setError('Please select a file.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const version = data.version ? parseInt(data.version, 10) : undefined;
      await onSubmit(selectedFile, data.format, version);
      setSelectedFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload edition.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Upload Edition: {book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit(handleSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="edition-file">
                Edition File <span className="text-error">*</span>
              </FieldLabel>
              <div className="flex items-center gap-4">
                <label htmlFor="edition-file" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
                    <Upload className="h-4 w-4" />
                    <span>Choose File</span>
                  </div>
                  <input
                    id="edition-file"
                    type="file"
                    accept={selectedFormat === 'Pdf' ? 'application/pdf' : 'application/epub+zip,application/epub'}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </label>
                {selectedFile && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{selectedFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Supported formats: PDF, EPUB. Max size: 100MB
              </p>
              {error && (
                <p className="text-sm text-error mt-1">{error}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="format">
                Format <span className="text-error">*</span>
              </FieldLabel>
              <select
                id="format"
                {...register('format')}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                disabled={isSubmitting}
              >
                <option value="Pdf">PDF</option>
                <option value="Epub">EPUB</option>
              </select>
              {errors.format && (
                <p className="text-sm text-error mt-1">
                  {errors.format.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="version">
                Version (optional)
              </FieldLabel>
              <Input
                id="version"
                type="number"
                min="1"
                {...register('version')}
                placeholder="Auto-incremented if not provided"
                disabled={isSubmitting}
              />
              {errors.version && (
                <p className="text-sm text-error mt-1">
                  {errors.version.message}
                </p>
              )}
            </Field>
            <Field>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={!selectedFile || isSubmitting}>
                  {isSubmitting ? 'Uploading...' : 'Upload Edition'}
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

