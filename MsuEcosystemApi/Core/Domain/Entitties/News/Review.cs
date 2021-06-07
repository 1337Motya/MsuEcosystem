namespace Domain.Entitties.News
{
    public class Review
    {
        public string Id { get; set; }
        public string DraftId { get; set; }
        public bool IsPublished { get; set; }
        public string ReviewerId { get; set; }
        public string ReviewText { get; set; }

        public Draft Draft { get; set; }
    }
}
