using Domain.Entitties.News;
using Domain.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.ReviewFeatures.Commands
{
    public class UpdateReview
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
                _reviewRepository.Update(request.Review);
                return new Response(true, $"Рецензия успешно обновлена");
            }
        }
    }
}
