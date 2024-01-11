using vintage_kitman_API.Model;

namespace vintage_kitman_API.ViewModels.CategoriesModels
{
    public class SportVM
    {
        public int SportId { get; set; }
        public string Name { get; set; }
        public ICollection<League> Leagues { get; set; }
    }
}
