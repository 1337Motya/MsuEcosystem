using Application.Services.InfoService.StudentFeatures.Queries;
using Application.Services.InfoService.TeacherFeatures.Queries;
using Domain.Entitties.Identity;
using Domain.Entitties.Identity.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.UserService.Queries
{
    public class GetUserPreviewById
    {
        public record Query(string Id) : IRequest<UserPreviewModel>;

        public record Response(bool Succeeded, string Message, UserPreviewModel User);

        public class Handler : IRequestHandler<Query, UserPreviewModel>
        {
            private readonly UserManager<MsuUser> _userManager;
            private readonly IMediator _mediator;

            public Handler(UserManager<MsuUser> userManager, IMediator mediator)
            {
                _userManager = userManager;
                _mediator = mediator;
            }

            public async Task<UserPreviewModel> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.Id);
                if (user == null)
                {
                    return null;
                }
                var userViewModel = new UserPreviewModel
                {
                    Id = user.Id,
                    UserName = user.UserName,
                };
                if (user.IsTeacher)
                {
                    var personalData = await _mediator.Send(new GetTeacherByCode.Query(user.TeacherCode));
                    userViewModel.FatherName = personalData.FatherName;
                    userViewModel.FirstName = personalData.FirstName;
                    userViewModel.LastName = personalData.LastName;
                    userViewModel.AvatarImageUrl = personalData.PhotoUrl;
                }
                else
                {
                    var personalData = await _mediator.Send(new GetStudentByStudentCard.Query(user.StudentCardId));
                    userViewModel.FatherName = personalData.FatherName;
                    userViewModel.FirstName = personalData.FirstName;
                    userViewModel.LastName = personalData.LastName;
                    userViewModel.AvatarImageUrl = personalData.PhotoUrl;
                }
                return userViewModel;
            }
        }
    }
}
