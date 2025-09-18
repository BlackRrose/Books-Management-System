
using Microsoft.EntityFrameworkCore;

namespace KPI_Project.Models
{
    public class BooksRepository : IBooksRepository // DATA LAYER
    {

        private readonly AppDBContext _appDBContext;

        public BooksRepository(AppDBContext appDBContext)
        {
            _appDBContext = appDBContext;
        }


        public void Add<T>(T item) where T : class
        {
            _appDBContext.Add<T>(item);
        }

        public void Delete<T>(T item) where T : class
        {
            _appDBContext.Remove<T>(item);
        }

        public async Task<Book[]> GetAllBooksAsync()
        {
            IQueryable<Book> books = _appDBContext.Books.AsQueryable();

            return await books.ToArrayAsync();
        }

        public Task<Book> GetBookAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Book> GetBookByIdAsync(int Id)
        {
            IQueryable<Book> book = _appDBContext.Books.Where(x => x.Id == Id);

            return await book.FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDBContext.SaveChangesAsync() > 0;
        }
    }
}
