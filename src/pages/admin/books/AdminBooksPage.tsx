import { AdminLayout } from '../../../layouts/AdminLayout';
import { Button } from '../../../shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Plus } from 'lucide-react';
import {
  BookTableRow,
  BookSearchBar,
  CreateBookForm,
  UpdateBookForm,
  RemoveBookForm,
  SetPricingForm,
  UploadCoverForm,
  UploadEditionForm,
  useBooks,
  useBookState,
  useBookActions,
  filterBooks,
} from '../../../features/admin/books';

export const AdminBooksPage = () => {
  const {
    books,
    isLoading,
    error,
    totalCount,
    currentPage,
    totalPages,
    statistics,
    refreshBooks,
    refreshStatistics,
  } = useBooks();

  const {
    searchQuery,
    setSearchQuery,
    selectedBook,
    actionType,
    expandedBookId,
    uploadError,
    setUploadError,
    openAction,
    closeAction,
    toggleExpanded,
  } = useBookState();

  const {
    createBook,
    updateBook: updateBookAction,
    removeBook,
    setPricing,
    publishBook,
    unlistBook,
    uploadCover,
    uploadEdition,
  } = useBookActions({
    selectedBook,
    searchQuery,
    currentPage,
    refreshBooks,
    refreshStatistics,
    closeAction,
    setUploadError,
  });

  const filteredBooks = filterBooks(books, searchQuery);

  const handlePageChange = (newPage: number) => {
    refreshBooks(searchQuery, newPage);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="page-header">
          <div>
            <h1 className="page-title">Manage Books</h1>
            <p className="page-description">Create, update, publish, and manage books, pricing, and content</p>
          </div>
          <Button onClick={() => openAction('create')} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Book
          </Button>
        </div>

        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Books</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{statistics.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{statistics.published}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Draft</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{statistics.draft}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Unlisted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{statistics.unlisted}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">New (30 days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{statistics.newLast30Days}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">{error}</div>
        )}

        {actionType === 'create' && (
          <CreateBookForm
            onSubmit={createBook}
            onCancel={closeAction}
          />
        )}

        {actionType === 'update' && selectedBook && (
          <UpdateBookForm
            book={selectedBook}
            onSubmit={updateBookAction}
            onCancel={closeAction}
          />
        )}

        {actionType === 'setPricing' && selectedBook && (
          <SetPricingForm
            book={selectedBook}
            onSubmit={setPricing}
            onCancel={closeAction}
          />
        )}

        {actionType === 'remove' && selectedBook && (
          <RemoveBookForm
            book={selectedBook}
            onSubmit={removeBook}
            onCancel={closeAction}
          />
        )}

        {actionType === 'uploadCover' && selectedBook && (
          <UploadCoverForm
            book={selectedBook}
            onSubmit={uploadCover}
            onCancel={closeAction}
          />
        )}

        {actionType === 'uploadEdition' && selectedBook && (
          <UploadEditionForm
            book={selectedBook}
            onSubmit={uploadEdition}
            onCancel={closeAction}
          />
        )}

        {uploadError && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">{uploadError}</div>
        )}

        {isLoading && books.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <div className="card-header-flex">
                <CardTitle>Books ({totalCount})</CardTitle>
                <BookSearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
            </CardHeader>
            <CardContent>
              {filteredBooks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? 'No books found matching your search' : 'No books found'}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="table-header">
                          <th className="table-header-cell">Title & Author</th>
                          <th className="table-header-cell">Price</th>
                          <th className="table-header-cell">Status</th>
                          <th className="table-header-cell">Categories</th>
                          <th className="table-header-cell-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBooks.map((book) => (
                          <BookTableRow
                            key={book.id}
                            book={book}
                            isExpanded={expandedBookId === book.id}
                            onToggleExpanded={() => toggleExpanded(book.id)}
                            onUpdate={() => openAction('update', book)}
                            onSetPricing={() => openAction('setPricing', book)}
                            onPublish={() => publishBook(book.id)}
                            onUnlist={() => unlistBook(book.id)}
                            onRemove={() => {
                              if (book.status !== 'Removed') {
                                openAction('remove', book);
                              }
                            }}
                            onUploadCover={() => openAction('uploadCover', book)}
                            onUploadEdition={() => openAction('uploadEdition', book)}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1 || isLoading}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages || isLoading}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

