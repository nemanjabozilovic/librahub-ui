import { useForm } from 'react-hook-form';
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
import type { SetPricingRequest, BookDetails } from '../types';
import { setPricingSchema, type SetPricingFormData } from '../validations';

interface SetPricingFormProps {
  book: BookDetails;
  onSubmit: (data: SetPricingRequest) => Promise<void>;
  onCancel: () => void;
}

export const SetPricingForm = ({ book, onSubmit, onCancel }: SetPricingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SetPricingFormData>({
    resolver: zodResolver(setPricingSchema),
    defaultValues: {
      price: book.pricing?.price || 0,
      currency: book.pricing?.currency || 'USD',
      vatRate: book.pricing?.vatRate || 0.2,
      promoPrice: book.pricing?.promoPrice,
      promoStartDate: book.pricing?.promoStartDate
        ? book.pricing.promoStartDate.split('T')[0]
        : '',
      promoEndDate: book.pricing?.promoEndDate
        ? book.pricing.promoEndDate.split('T')[0]
        : '',
    },
  });

  const handleFormSubmit = async (data: SetPricingFormData) => {
    const submitData = {
      ...data,
      promoStartDate: data.promoStartDate
        ? new Date(data.promoStartDate).toISOString()
        : undefined,
      promoEndDate: data.promoEndDate
        ? new Date(data.promoEndDate).toISOString()
        : undefined,
    };
    await onSubmit(submitData as SetPricingRequest);
    reset();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Set Pricing: {book.title}</CardTitle>
        <CardDescription>
          Set the price and promotional pricing for this book
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="price">
                  Price <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('price', { valueAsNumber: true })}
                  placeholder="0.00"
                  required
                  disabled={isSubmitting}
                />
                {errors.price && (
                  <p className="text-sm text-error mt-1">{errors.price.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="currency">
                  Currency <span className="text-error">*</span>
                </FieldLabel>
                <Input
                  id="currency"
                  {...register('currency')}
                  placeholder="USD"
                  required
                  disabled={isSubmitting}
                />
                {errors.currency && (
                  <p className="text-sm text-error mt-1">{errors.currency.message}</p>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="vatRate">VAT Rate</FieldLabel>
              <Input
                id="vatRate"
                type="number"
                step="0.01"
                min="0"
                max="1"
                {...register('vatRate', { valueAsNumber: true })}
                placeholder="0.20"
                disabled={isSubmitting}
              />
              {errors.vatRate && (
                <p className="text-sm text-error mt-1">{errors.vatRate.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="promoPrice">Promotional Price</FieldLabel>
              <Input
                id="promoPrice"
                type="number"
                step="0.01"
                min="0"
                {...register('promoPrice', { valueAsNumber: true })}
                placeholder="Optional promotional price"
                disabled={isSubmitting}
              />
              {errors.promoPrice && (
                <p className="text-sm text-error mt-1">{errors.promoPrice.message}</p>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="promoStartDate">Promo Start Date</FieldLabel>
                <Input
                  id="promoStartDate"
                  type="date"
                  {...register('promoStartDate')}
                  disabled={isSubmitting}
                />
                {errors.promoStartDate && (
                  <p className="text-sm text-error mt-1">{errors.promoStartDate.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="promoEndDate">Promo End Date</FieldLabel>
                <Input
                  id="promoEndDate"
                  type="date"
                  {...register('promoEndDate')}
                  disabled={isSubmitting}
                />
                {errors.promoEndDate && (
                  <p className="text-sm text-error mt-1">{errors.promoEndDate.message}</p>
                )}
              </Field>
            </div>

            <Field>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? 'Setting Price...' : 'Set Pricing'}
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

