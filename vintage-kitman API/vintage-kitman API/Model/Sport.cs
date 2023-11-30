namespace vintage_kitman_API.Model
{
    public class Sport
    {
        public int SportId { get; set; }
        public string Name { get; set; }

        //navigation
        public ICollection<Country> Countries { get; set; }
        public ICollection<League> Leagues { get; set; }
    }
}
