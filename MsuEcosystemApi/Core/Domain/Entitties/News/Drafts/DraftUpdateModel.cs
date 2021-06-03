namespace Domain.Entitties.News.Drafts
{
    public class DraftUpdateModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string PreviewImageUrl { get; set; }
        public bool IsReadyForReview { get; set; }
    }
}
