using Repositories.Models;
using System.Linq.Expressions;

namespace Services.ViewModels.Output
{
    public class TaskViewModelOutput
    {
        public int Id { get; set; }
        public bool Completed { get; set; }
        public string Details { get; set; }
    }
}
