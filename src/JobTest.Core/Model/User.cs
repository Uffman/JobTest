namespace JobTest.Core.Model
{
    public class User
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string LoginName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Company Company { get; set; }
    }
}
