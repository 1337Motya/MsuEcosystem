using Application.Services.UserService.Queries;
using Domain.Entitties.News;
using Domain.Entitties.News.ViewModels;
using Domain.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.PublicationFeatures.Queries
{
    public static class GetPublicationsList
    {
        public record Query() : IRequest<IEnumerable<PublicationPreviewModel>>;

        public class Handler : IRequestHandler<Query, IEnumerable<PublicationPreviewModel>>
        {
            private readonly IRepository<Publication> _publicationRepository;
            private readonly IMediator _mediator;

            public Handler(IRepository<Publication> publicationRepository, IMediator mediator)
            {
                _publicationRepository = publicationRepository;
                _mediator = mediator;
            }

            public async Task<IEnumerable<PublicationPreviewModel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var publications = await _publicationRepository.GetAsync();
                var result = new List<PublicationPreviewModel>();
                foreach (var publication in publications)
                {
                    result.Add(new PublicationPreviewModel
                    {
                        Id = publication.Id,
                        Title = publication.Article.Draft.Title,
                        PreviewImageUrl = publication.Article.Draft.PreviewImageUrl,
                        PublicationDate = publication.PublicationDate,
                        IsPinned = publication.IsPinned,
                        ReviewId = publication.ReviewId,
                        Author = await _mediator.Send(new GetUserPreviewById.Query(publication.Article.Draft.AuthorId)),
                        Editor = await _mediator.Send(new GetUserPreviewById.Query(publication.Article.ReviewerId))
                    });
                }
                return result;
            }
        }
    }
}