using Domain.Entitties.News;
using Domain.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.ReviewFeatures.Commands
{
    public static class CreateReview
    {
        public record Command(Review Review) : IRequest<Response>;

        public record Response(bool Succeeded, string Message);
        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IRepository<Review> _reviewRepository;

            public Handler(IRepository<Review> reviewRepository)
            {
                _reviewRepository = reviewRepository;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                request.Review.Id = Guid.NewGuid().ToString();
                await _reviewRepository.CreateAsync(request.Review);
                return new Response(true, $"Рецензия успешно добавлена");
            }
        }
    }
}
