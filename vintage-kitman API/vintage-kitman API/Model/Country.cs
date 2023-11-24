namespace vintage_kitman_API.Model
{
    public class Country
    {
        public int CountryId { get; set; }
        public string Name { get; set; }

        public ICollection<Sport> Sports { get; set; }
    }
}
