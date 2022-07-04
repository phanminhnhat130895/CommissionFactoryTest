using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.ViewModels.Input;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetListTask()
        {
            return Ok(await _taskService.GetListTask());
        }

        [HttpGet("detail")]
        public async Task<IActionResult> GetTask([FromQuery] int taskId)
        {
            return Ok(await _taskService.GetTask(taskId));
        }

        [HttpPost("create-task")]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskInput input)
        {
            return Ok(await _taskService.CreateTask(input));
        }

        [HttpPut("edit-task-detail")]
        public async Task<IActionResult> EditTaskDetail([FromBody] EditTaskInput input)
        {
            return Ok(await _taskService.EditTaskDetail(input));
        }

        [HttpPut("complete-task")]
        public async Task<IActionResult> ToggleCompleteTask([FromQuery] int taskId)
        {
            return Ok(await _taskService.ToggleCompletedTask(taskId));
        }

        [HttpDelete("delete-task")]
        public async Task<IActionResult> DeleteTask([FromQuery] int taskId)
        {
            return Ok(await _taskService.DeleteTask(taskId));
        }
    }
}
