using Domain.Entitties.News;
using Domain.Entitties.News.ViewModels;
using Domain.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.PublicationFeatures.Queries
{
    public static class GetPublication
    {
        public record Query(string PublicationId) : IRequest<PublicationViewModel>;

        public class Handler : IRequestHandler<Query, PublicationViewModel>
        {
            private readonly IRepository<Publication> _publicationRepository;

            public Handler(IRepository<Publication> publicationRepository)
            {
                _publicationRepository = publicationRepository;
            }

            public async Task<PublicationViewModel> Handle(Query request, CancellationToken cancellationToken)
            {
                var publication = await _publicationRepository.GetAsync(request.PublicationId);
                return new PublicationViewModel
                {
                    Id = publication.Id,
                    Text = publication.Article.Draft.Text,
                    Title = publication.Article.Draft.Title,
                    PreviewImageUrl = publication.Article.Draft.PreviewImageUrl,
                    PublicationDate = publication.PublicationDate
                };
            }
        }
    }
}
