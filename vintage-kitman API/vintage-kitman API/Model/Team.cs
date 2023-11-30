namespace vintage_kitman_API.Model
{
    public class Team
    {
        public int TeamId { get; set; }
        public string Name { get; set; }
        public int LeagueId { get; set; }
        //navigation
        public League League { get; set; }
        public ICollection<Kit> Kits { get; set; }
    }
}
