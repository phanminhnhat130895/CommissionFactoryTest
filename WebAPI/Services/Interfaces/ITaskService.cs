using Services.ViewModels.Input;
using Services.ViewModels.Output;

namespace Services.Interfaces
{
    public interface ITaskService
    {
        Task<List<TaskViewModelOutput>> GetListTask();
        Task<TaskViewModelOutput> GetTask(int taskId);
        Task<TaskViewModelOutput> CreateTask(CreateTaskInput input);
        Task<EditTaskDetailOutput> EditTaskDetail(EditTaskInput input);
        Task<CompleteTaskOutput> ToggleCompletedTask(int taskId);
        Task<DeleteTaskOutput> DeleteTask(int taskId);
    }
}
