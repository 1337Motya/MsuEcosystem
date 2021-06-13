using Domain.Entitties.News;
using Domain.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.PublicationFeatures.Commands
{
    public class UpdatePublication
    {
        public record Command(Publication Publication) : IRequest<Response>;

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
                _publicationRepository.Update(request.Publication);
                return new Response(true, $"Публикация успешно обновлена");
            }
        }
    }
}
