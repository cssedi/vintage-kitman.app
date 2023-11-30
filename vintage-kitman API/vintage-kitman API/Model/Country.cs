namespace vintage_kitman_API.Model
{
    public class Country
    {
        public int CountryId { get; set; }
        public string Name { get; set; }
        public string Flag { get; set; }
        //navigation
        public ICollection<Sport> Sports { get; set; }
    }
}
