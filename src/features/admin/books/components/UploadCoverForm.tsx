import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
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

interface UploadCoverFormProps {
  book: BookDetails;
  onSubmit: (file: File) => Promise<void>;
  onCancel: () => void;
}

export const UploadCoverForm = ({ book, onSubmit, onCancel }: UploadCoverFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB.');
        return;
      }
      setError(null);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(selectedFile);
      setSelectedFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload cover image.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Upload Cover: {book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="cover-file">
                Cover Image <span className="text-error">*</span>
              </FieldLabel>
              <div className="flex items-center gap-4">
                <label htmlFor="cover-file" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-md hover:bg-accent">
                    <Upload className="h-4 w-4" />
                    <span>Choose File</span>
                  </div>
                  <input
                    id="cover-file"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
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
                Supported formats: JPEG, PNG, WebP. Max size: 10MB
              </p>
              {error && (
                <p className="text-sm text-error mt-1">{error}</p>
              )}
            </Field>
            <Field>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={!selectedFile || isSubmitting}>
                  {isSubmitting ? 'Uploading...' : 'Upload Cover'}
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

