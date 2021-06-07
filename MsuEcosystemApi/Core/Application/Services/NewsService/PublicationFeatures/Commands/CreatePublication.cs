using Domain.Entitties.News;
using Domain.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.PublicationFeatures.Commands
{
    public static class CreatePublication
    {
        public record Command(string ReviewId) : IRequest<Response>;

        public record Response(bool Succeeded, string Message);

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IRepository<Publication> _publicationRepository;

            public Handler(IRepository<Publication> publicationRepository)
            {
                _publicationRepository = publicationRepository;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                await _publicationRepository.CreateAsync(
                    new Publication
                    {
                        Id = Guid.NewGuid().ToString(),
                        ReviewId = request.ReviewId,
                        PublicationDate = DateTime.Now,
                        IsPinned = false
                    });
                return new Response(true, $"Статья успешно опубликована");
            }
        }
    }
}
