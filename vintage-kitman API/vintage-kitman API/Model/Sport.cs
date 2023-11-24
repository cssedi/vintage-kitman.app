namespace vintage_kitman_API.Model
{
    public class Sport
    {
        public int SportId { get; set; }
        public string Name { get; set; }
        public ICollection<Country> Countries { get; set; }
    }
}
