using Repositories.Models;

namespace Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task<List<Tasks>> GetListTask();
        Task<Tasks> GetTask(int taskId);
        Task<int> CreateTask(Tasks model);
        Task EditTask(Tasks model);
    }
}
