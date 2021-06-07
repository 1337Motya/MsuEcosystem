using Application.Services.UserService.Queries;
using Domain.Entitties.News;
using Domain.Entitties.News.ViewModels;
using Domain.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.DraftFeatures.Queries
{
    public static class GetDraftsForReview
    {
        public record Query(string ReviewerId) : IRequest<IEnumerable<DraftPreviewModel>>;

        public class Handler : IRequestHandler<Query, IEnumerable<DraftPreviewModel>>
        {
            private readonly IRepository<Draft> _draftRepository;
            private readonly IMediator _mediator;

            public Handler(IRepository<Draft> draftRepository, IMediator mediator)
            {
                _draftRepository = draftRepository;
                _mediator = mediator;
            }

            public async Task<IEnumerable<DraftPreviewModel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var drafts = await _draftRepository.GetAsync(i => i.IsReadyForReview
                && !i.IsReviewed/* && i.AuthorId != request.ReviewerId*/);
                var result = new List<DraftPreviewModel>();
                foreach (var draft in drafts)
                {
                    result.Add(new DraftPreviewModel
                    {
                        Id = draft.Id,
                        IsReviewed = draft.IsReviewed,
                        Title = draft.Title,
                        IsApproved = draft.IsApproved,
                        IsReadyForReview = draft.IsReadyForReview,
                        IsRequiresChanges = draft.IsRequiresChanges,
                        Author = await _mediator.Send(new GetUserPreviewById.Query(draft.AuthorId))
                    });
                }
                return result;
            }
        }
    }
}
