namespace vintage_kitman_API.Model
{
    public class League
    {
        public int LeagueId { get; set; }
        public string Name { get; set; }
        public bool IsWomensLeague { get; set; }
        public int SportId { get; set; }
        //navigation
        public Sport Sport { get; set; }
        public ICollection<Team> Teams { get; set; }
    }
}
