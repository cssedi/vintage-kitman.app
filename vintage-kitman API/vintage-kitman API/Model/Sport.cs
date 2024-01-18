using System.ComponentModel.DataAnnotations;

namespace vintage_kitman_API.Model
{
    public class Sport
    {
        [Key]
        public int SportId { get; set; }
        public string Name { get; set; }

        //navigation
        public ICollection<League> Leagues { get; set; }
    }
}
