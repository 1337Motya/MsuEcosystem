using Application.Services.NewsService.DraftFeatures.Commands;
using Application.Services.NewsService.DraftFeatures.Queries;
using Application.Services.NewsService.PublicationFeatures.Commands;
using Application.Services.NewsService.PublicationFeatures.Queries;
using Application.Services.NewsService.ReviewFeatures.Commands;
using Application.Services.NewsService.ReviewFeatures.Queries;
using Application.Services.UserService.Queries;
using Domain.Entitties.News;
using Domain.Entitties.News.Drafts;
using Domain.Entitties.News.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public NewsController(IMediator mediatr)
        {
            _mediator = mediatr;
        }

        [Authorize]
        [HttpPost("drafts/create")]
        public async Task<IActionResult> AddDraft(DraftCreateModel draft)
        {
            var currentUser = await _mediator.Send(new GetCurrentUser.Query(User));
            var response = await _mediator.Send(new CreateDraft.Command(draft, currentUser.User.Id));
            if (!response.Successed)
            {
                return BadRequest(response.Message);
            }
            return Ok(response.Message);
        }

        [Authorize]
        [HttpGet("drafts/{id}")]
        public async Task<IActionResult> GetDraftById(string id)
        {
            var response = await _mediator.Send(new GetDraft.Query(id));
            if (response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }

        [Authorize]
        [HttpPut("drafts/update")]
        public async Task<IActionResult> UpdateDraft([FromBody] Draft draft)
        {
            var result = await _mediator.Send(new UpdateDraft.Command(draft));
            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
        }

        [Authorize]
        [HttpDelete("drafts/{id}")]
        public async Task<IActionResult> DeleteDraft(string id)
        {
            var result = await _mediator.Send(new DeleteDraft.Command(id));
            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
        }

        [Authorize]
        [HttpGet("drafts/list")]
        public async Task<IEnumerable<DraftPreviewModel>> GetDraftsList()
        {
            var currentUser = await _mediator.Send(new GetCurrentUser.Query(User));
            return await _mediator.Send(new GetUserDraftsList.Query(currentUser.User.Id));
        }

        [Authorize]
        [HttpGet("drafts/ForReviewList/")]
        public async Task<IEnumerable<DraftPreviewModel>> GetDraftsForReviewList()
        {
            var currentUser = await _mediator.Send(new GetCurrentUser.Query(User));
            return await _mediator.Send(new GetDraftsForReview.Query(currentUser.User.Id));
        }

        [Authorize]
        [HttpPost("reviews/create")]
        public async Task<IActionResult> AddReview(Review review)
        {
            var currentUser = await _mediator.Send(new GetCurrentUser.Query(User));
            review.ReviewerId = currentUser.User.Id;
            var result = await _mediator.Send(new CreateReview.Command(review));
            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
        }

        [Authorize]
        [HttpGet("reviews/")]
        public async Task<IEnumerable<ReviewPreviewModel>> GetReviewList()
        {
            var currentUser = await _mediator.Send(new GetCurrentUser.Query(User));
            return await _mediator.Send(new GetReviewsList.Query(currentUser.User.Id));
        }

        [Authorize]
        [HttpDelete("reviews/delete/{id}")]
        public IActionResult DeleteReview(string id)
        {
            var result = _mediator.Send(new DeleteReview.Command(id)).Result;
            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
        }

        [Authorize]
        [HttpGet("reviews/draft/{draftId}")]
        public async Task<IActionResult> GetReview(string draftId)
        {
            var result = await _mediator.Send(new GetDraftReview.Query(draftId));
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [Authorize]
        [HttpPost("publication/create/{reviewId}")]
        public async Task<IActionResult> Publish(string reviewId)
        {
            var result = await _mediator.Send(new CreatePublication.Command(reviewId));
            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
        }


        [HttpGet("GetPublicationList")]
        public async Task<IEnumerable<PublicationPreviewModel>> GetPublicationList()
        {
            return await _mediator.Send(new GetPublicationsList.Query());
        }

        [HttpGet("publications/{id}")]
        public async Task<PublicationViewModel> GetPublicationById(string id)
        {
            return await _mediator.Send(new GetPublication.Query(id));
        }

        [Authorize]
        [HttpDelete("publications/delete/{id}")]
        public async Task<IActionResult> DeletePublication(string id)
        {
            var result = await _mediator.Send(new DeletePublication.Command(id));
            return result.Succeeded ? Ok(result.Message) : BadRequest(result.Message);
        }
    }
}
