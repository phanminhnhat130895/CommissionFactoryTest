using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using Repositories.Models;

namespace Repositories.Implementations
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DatabaseContext _context;

        public TaskRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Tasks>> GetListTask()
        {
            return await _context.Tasks.Where(t => t.DateDeleted == null).OrderBy(t => t.Id).ToListAsync();
        }

        public async Task<Tasks> GetTask(int taskId)
        {
            return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskId && t.DateDeleted == null);
        }

        public async Task<int> CreateTask(Tasks model)
        {
            await _context.Tasks.AddAsync(model);
            await _context.SaveChangesAsync();
            return model.Id;
        }

        public async Task EditTask(Tasks model)
        {
            _context.Update(model);
            await _context.SaveChangesAsync();
        }
    }
}
