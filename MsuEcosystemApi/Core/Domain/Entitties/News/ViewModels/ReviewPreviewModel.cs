using Domain.Entitties.Identity.ViewModels;

namespace Domain.Entitties.News.ViewModels
{
    public class ReviewPreviewModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public bool IsPublished { get; set; }
        public UserPreviewModel Author { get; set; }
    }
}
