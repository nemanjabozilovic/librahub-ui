import { Input } from '@/shared/components/ui/input';
import { Search } from 'lucide-react';

interface BookSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const BookSearchBar = ({ value, onChange }: BookSearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search books by title, author, ISBN..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-64"
      />
    </div>
  );
};

