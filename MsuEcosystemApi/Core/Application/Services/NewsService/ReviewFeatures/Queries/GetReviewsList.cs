using Application.Services.UserService.Queries;
using Domain.Entitties.News;
using Domain.Entitties.News.ViewModels;
using Domain.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.ReviewFeatures.Queries
{
    public static class GetReviewsList
    {
        public record Query(string UserId) : IRequest<IEnumerable<ReviewPreviewModel>>;

        public record Response(bool Succeeded, string Message);
        public class Handler : IRequestHandler<Query, IEnumerable<ReviewPreviewModel>>
        {
            private readonly IRepository<Review> _reviewRepository;
            private readonly IMediator _mediator;

            public Handler(IRepository<Review> reviewRepository, IMediator mediator)
            {
                _reviewRepository = reviewRepository;
                _mediator = mediator;
            }

            public async Task<IEnumerable<ReviewPreviewModel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var reviews = await _reviewRepository.GetAsync(i => i.ReviewerId == request.UserId && i.Draft.IsApproved);
                var result = new List<ReviewPreviewModel>();
                foreach (var review in reviews)
                {
                    if (!review.IsPublished)
                    {
                        result.Add(new ReviewPreviewModel
                        {
                            Id = review.Id,
                            Title = review.Draft.Title,
                            IsPublished = review.IsPublished,
                            Author = await _mediator.Send(new GetUserPreviewById.Query(review.Draft.AuthorId))
                        });
                    }
                }
                return result;
            }
        }
    }
}
