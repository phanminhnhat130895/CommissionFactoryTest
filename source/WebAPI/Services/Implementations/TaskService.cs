using Repositories.Interfaces;
using Repositories.Models;
using Services.Interfaces;
using Services.ViewModels.Input;
using Services.ViewModels.Output;

namespace Services.Implementations
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<CompleteTaskOutput> ToggleCompletedTask(int taskId)
        {
            var result = new CompleteTaskOutput();
            try
            {
                var task = await _taskRepository.GetTask(taskId);
                if(task == null)
                {
                    result.isSuccess = false;
                    result.message = "Task not found";

                    return result;
                }

                task.Completed = !task.Completed;
                await _taskRepository.EditTask(task);

                result.isSuccess = true;
                result.message = "Complete task success";

                return result;
            }
            catch(Exception ex)
            {
                // TODO: log exception
                result.isSuccess = false;
                result.message = "Complete task failed";

                return result;
            }
        }

        public async Task<TaskViewModelOutput> CreateTask(CreateTaskInput input)
        {
            try
            {
                var task = new Tasks();
                task.Details = input.Details;
                task.DateCreated = DateTime.UtcNow;
                var id = await _taskRepository.CreateTask(task);
                var createdTask = await _taskRepository.GetTask(id);
                return new TaskViewModelOutput()
                {
                    Id = createdTask.Id,
                    Completed = createdTask.Completed,
                    Details = createdTask.Details,
                };
            }
            catch(Exception ex)
            {
                // TODO: log exception
                return null;
            }
        }

        public async Task<DeleteTaskOutput> DeleteTask(int taskId)
        {
            var result = new DeleteTaskOutput();
            try
            {
                var task = await _taskRepository.GetTask(taskId);
                if(task == null)
                {
                    result.isSuccess = false;
                    result.message = "Task not found";
                    return result;
                }

                task.DateDeleted = DateTime.UtcNow;
                await _taskRepository.EditTask(task);

                result.isSuccess = true;
                result.message = "Delete task success";
                return result;
            }
            catch(Exception ex)
            {
                // TODO: log exception
                result.isSuccess = false;
                result.message = "Delete task failed";
                return result;
            }
        }

        public async Task<EditTaskDetailOutput> EditTaskDetail(EditTaskInput input)
        {
            var result = new EditTaskDetailOutput();
            try
            {
                var task = await _taskRepository.GetTask(input.Id);
                if (task == null)
                {
                    result.isSuccess = false;
                    result.message = "Task not found";

                    return result;
                }

                task.Details = input.Details;
                await _taskRepository.EditTask(task);

                result.isSuccess = true;
                result.message = "Edit task success";

                return result;
            }
            catch (Exception ex)
            {
                // TODO: log exception
                result.isSuccess = false;
                result.message = "Edit task failed";

                return result;
            }
        }

        public async Task<List<TaskViewModelOutput>> GetListTask()
        {
            try
            {
                var result = new List<TaskViewModelOutput>();
                var listTask = await _taskRepository.GetListTask();

                // TODO: create mapper to map object
                foreach (var task in listTask)
                {
                    result.Add(new TaskViewModelOutput()
                    {
                        Id = task.Id,
                        Completed = task.Completed,
                        Details = task.Details
                    });
                }

                return result;
            }
            catch(Exception ex)
            {
                // TODO: log exception
                return null;
            }
        }

        public async Task<TaskViewModelOutput> GetTask(int taskId)
        {
            try
            {
                var task = await _taskRepository.GetTask(taskId);
                return new TaskViewModelOutput()
                {
                    Id = task.Id,
                    Completed = task.Completed,
                    Details = task.Details
                };
            }
            catch(Exception ex)
            {
                // TODO: log exception
                return null;
            }
        }
    }
}
