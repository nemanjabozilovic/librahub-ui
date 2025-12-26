import { Input } from '@/shared/components/ui/input';
import { Search } from 'lucide-react';

interface UserSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const UserSearchBar = ({
  value,
  onChange,
  placeholder = 'Search by name or email...',
}: UserSearchBarProps) => {
  return (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

