namespace KPI_Project.ViewModels
{
    public class BooksViewModel
    {
        public required string Title { get; set; }

        public required string Author { get; set; }

        public required string Isbn { get; set; }

        public decimal Price { get; set; }

        public DateTime? PublishedDate { get; set; }

        public required string Description { get; set; }

        public bool isFlipped { get; set; } = false;

    }
}
