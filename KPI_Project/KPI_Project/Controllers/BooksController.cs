using KPI_Project.Models;
using KPI_Project.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KPI_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {

        private readonly IBooksRepository _booksRepository;

        public BooksController(IBooksRepository booksRepository)
        {
            _booksRepository = booksRepository;
        }

        [HttpGet]
        [Route("GetAllBooks")]
        public async Task<IActionResult> GetAllBooksAsync()
        {

            try
            {
                var result = await _booksRepository.GetAllBooksAsync();

                return Ok(result);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, Please contact support");
            }
        }

        [HttpGet]
        [Route("GetBookById")]
        public async Task<IActionResult> GetBookByIdAsync(int Id)
        {

            try
            {
                var result = await _booksRepository.GetBookByIdAsync(Id);

                if(result == null)
                {
                    return NotFound("No Books match the given Id"); //Returns 404 not found status code
                }

                return Ok(result);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, Please contact support");
            }
        }

        [HttpPost]
        [Route("AddBook")]
        public async Task<IActionResult> AddBook(BooksViewModel bwm)
        {
            var book = new Book();
            book.Title = bwm.Title;
            book.Author = bwm.Author;
            book.Isbn = bwm.Isbn;
            book.Price = bwm.Price;
            book.PublishedDate = bwm.PublishedDate;
            book.Description = bwm.Description;

            try
            {
                _booksRepository.Add(book);
                await _booksRepository.SaveChangesAsync();
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, Please contact support");
            }

            return Ok(new { message = "Book saved to the system" });
        }

        [HttpPut]
        [Route("UpdateBook")]
        public async Task<IActionResult> UpdateBook(int Id, BooksViewModel bvm)
        {

            try
            {
                var existingBook = await _booksRepository.GetBookByIdAsync(Id);

                if (existingBook == null) return NotFound("There is no book named " + bvm.Title);

                existingBook.Title = bvm.Title;
                existingBook.Author = bvm.Author;
                existingBook.Isbn = bvm.Isbn;
                existingBook.Price = bvm.Price;
                existingBook.PublishedDate = bvm.PublishedDate;
                existingBook.Description = bvm.Description;

                await _booksRepository.SaveChangesAsync();

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, Please contact support");
            }

            return Ok(new { message = "Book details has been updated" });
        }

        [HttpDelete]
        [Route("DeleteBook")]
        public async Task<IActionResult> DeleteBook(int Id)
        {

            try
            {
                var existingBook = await _booksRepository.GetBookByIdAsync(Id);
                if (existingBook == null) return NotFound("There is no book with the corresponding BookId");


                _booksRepository.Delete(existingBook);
                await _booksRepository.SaveChangesAsync();
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, Please contact support");
            }

            return Ok(new { message = "Book removed from the system" });
        }

    }
}
