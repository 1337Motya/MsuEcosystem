using Domain.Entitties.News;
using Domain.Entitties.News.Drafts;
using Domain.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.NewsService.DraftFeatures.Commands
{
    public static class CreateDraft
    {
        public record Command(DraftCreateModel draft, string AuthorId) : IRequest<Response>;

        public record Response(bool Successed, string Message);

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly IRepository<Draft> _draftRepository;

            public Handler(IRepository<Draft> draftRepository)
            {
                _draftRepository = draftRepository;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                await _draftRepository.CreateAsync(
                    new Draft
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = request.draft.Title,
                        Text = request.draft.Text,
                        PreviewImageUrl = request.draft.PreviewImageUrl,
                        AuthorId = request.AuthorId,
                        IsReadyForReview = request.draft.IsReadyForReview,
                        IsApproved = false,
                        IsRequiresChanges = false,
                        IsReviewed = false
                    });
                return new Response(true, $"Ваш черновик учпешно сохранён");
            }
        }
    }
}
