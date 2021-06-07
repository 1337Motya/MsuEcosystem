using Domain.Entitties.Identity.ViewModels;

namespace Domain.Entitties.News.ViewModels
{
    public class DraftPreviewModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public bool IsReadyForReview { get; set; }
        public bool IsReviewed { get; set; }
        public bool IsApproved { get; set; }
        public bool IsRequiresChanges { get; set; }
        public UserPreviewModel Author { get; set; }
    }
}
