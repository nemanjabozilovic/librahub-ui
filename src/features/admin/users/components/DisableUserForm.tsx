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
import type { DisableUserRequest, UserDetails } from '../types';
import { disableUserSchema, type DisableUserFormData } from '../validations';

interface DisableUserFormProps {
  user: UserDetails;
  onSubmit: (data: DisableUserRequest) => Promise<void>;
  onCancel: () => void;
}

export const DisableUserForm = ({ user, onSubmit, onCancel }: DisableUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DisableUserFormData>({
    resolver: zodResolver(disableUserSchema),
  });

  const handleFormSubmit = async (data: DisableUserFormData) => {
    await onSubmit(data as DisableUserRequest);
    reset();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Disable User: {user.email}</CardTitle>
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
                placeholder="Enter reason for disabling this user"
                required
              />
              {errors.reason && (
                <p className="text-sm text-error mt-1">
                  {errors.reason.message}
                </p>
              )}
            </Field>
            <Field>
              <div className="flex gap-2">
                <Button type="submit" variant="destructive" className="flex-1">
                  Disable User
                </Button>
                <Button type="button" variant="outline" onClick={onCancel}>
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

