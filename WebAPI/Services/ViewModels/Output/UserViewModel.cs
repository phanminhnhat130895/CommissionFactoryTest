namespace Services.ViewModels.Output
{
    public class UserViewModelOutput : BaseOutput
    {
        public string ID { get; set; }
        public string Email { get; set; }
        public bool isSuccess { get; set; }
    }
}
