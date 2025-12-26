import { Button } from '@/shared/components/ui/button';
import { Trash2, Upload, FileText, ChevronDown, ChevronUp, Edit, DollarSign, Globe, EyeOff } from 'lucide-react';
import type { BookDetails } from '../types';
import { getBookStatusBadge, formatPrice, formatAuthors } from '../utils';

interface BookTableRowProps {
  book: BookDetails;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onUpdate: () => void;
  onSetPricing: () => void;
  onPublish: () => void;
  onUnlist: () => void;
  onRemove: () => void;
  onUploadCover: () => void;
  onUploadEdition: () => void;
}

export const BookTableRow = ({
  book,
  isExpanded,
  onToggleExpanded,
  onUpdate,
  onSetPricing,
  onPublish,
  onUnlist,
  onRemove,
  onUploadCover,
  onUploadEdition,
}: BookTableRowProps) => {
  const isRemoved = book.status === 'Removed';
  const canPublish = book.status === 'Draft' && book.pricing && book.coverUrl;
  const canUnlist = book.status === 'Published';

  return (
    <>
      <tr
        className="table-row"
        onClick={onToggleExpanded}
      >
        <td className="table-cell">
          <div className="flex items-center gap-3">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            )}
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-12 h-16 object-cover rounded border border-border flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-12 h-16 bg-muted rounded border border-border flex-shrink-0 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">No cover</span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="font-medium text-foreground">{book.title}</div>
              <div className="text-sm text-muted-foreground">
                {formatAuthors(book.authors)}
              </div>
            </div>
          </div>
        </td>
        <td className="table-cell">
          {book.pricing ? (
            <div>
              <div className="font-medium text-foreground">
                {formatPrice(book.pricing.price, book.pricing.currency)}
              </div>
              {book.pricing.promoPrice && (
                <div className="text-sm text-muted-foreground line-through">
                  {formatPrice(book.pricing.promoPrice, book.pricing.currency)}
                </div>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">No price set</span>
          )}
        </td>
        <td className="table-cell">{getBookStatusBadge(book.status)}</td>
        <td className="table-cell">
          <div className="text-sm text-muted-foreground">
            {book.categories.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {book.categories.slice(0, 2).map((cat) => (
                  <span key={cat} className="px-2 py-1 bg-muted rounded text-xs">
                    {cat}
                  </span>
                ))}
                {book.categories.length > 2 && (
                  <span className="text-xs">+{book.categories.length - 2}</span>
                )}
              </div>
            ) : (
              <span>No categories</span>
            )}
          </div>
        </td>
        <td className="table-cell">
          <div className="table-actions">
            {!isRemoved && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdate();
                  }}
                  title="Update Book"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetPricing();
                  }}
                  title="Set Pricing"
                >
                  <DollarSign className="h-4 w-4" />
                </Button>
                {canPublish && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPublish();
                    }}
                    title="Publish Book"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                )}
                {canUnlist && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnlist();
                    }}
                    title="Unlist Book"
                  >
                    <EyeOff className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUploadCover();
                  }}
                  title="Upload Cover"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUploadEdition();
                  }}
                  title="Upload Edition"
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              disabled={isRemoved}
              title={isRemoved ? 'Book already removed' : 'Remove Book'}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={5} className="p-6 bg-muted/30">
            <div className="space-y-4">
              <div className="flex gap-6">
                {book.coverUrl && (
                  <div className="flex-shrink-0">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-32 h-48 object-cover rounded border border-border shadow-sm"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 space-y-4">
                  {book.description && (
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Description</h4>
                      <p className="text-sm text-muted-foreground">{book.description}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                {book.isbn && (
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">ISBN</h4>
                    <p className="text-sm text-muted-foreground">{book.isbn}</p>
                  </div>
                )}
                {book.publisher && (
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">Publisher</h4>
                    <p className="text-sm text-muted-foreground">{book.publisher}</p>
                  </div>
                )}
                {book.language && (
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">Language</h4>
                    <p className="text-sm text-muted-foreground">{book.language}</p>
                  </div>
                )}
                {book.publicationDate && (
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">Publication Date</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(book.publicationDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
                    {book.tags.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-foreground">Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {book.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-muted rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
          </td>
        </tr>
      )}
    </>
  );
};

