using Domain.Entitties.News;
using Domain.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.DraftFeatures.Commands
{
    public static class UpdateDraft
    {
        public record Command(Draft Draft) : IRequest<Response>;

        public record Response(bool Succeeded, string Message);

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IRepository<Draft> _draftRepository;

            public Handler(IRepository<Draft> draftRepository)
            {
                _draftRepository = draftRepository;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.Draft == null)
                {
                    return new Response(false, "Ошибка");
                }
                _draftRepository.Update(request.Draft);
                return new Response(true, "Обновлено");
            }

        }
    }
}
