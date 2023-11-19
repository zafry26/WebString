namespace RCB.JavaScript.Models
{
    public class PersonModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Skillsets { get; set; }

        public string Hobby { get; set; }

        public PersonModel(int id, string username, string email, string phoneNumber, string skillSets, string hobby)
        {
            Id = id;
            Username = username;
            Email = email;
            PhoneNumber = phoneNumber;
            Skillsets = skillSets;
            Hobby = hobby;
        }

        public PersonModel()
        {

        }
    }
}
