namespace KPI_Project.Models
{
    public interface IBooksRepository
    {
        void Add<T>(T item) where T : class;

        void Delete<T>(T item) where T : class;

        Task<bool> SaveChangesAsync();

        Task<Book[]> GetAllBooksAsync();

        Task<Book> GetBookByIdAsync(int Id);

    }
}
