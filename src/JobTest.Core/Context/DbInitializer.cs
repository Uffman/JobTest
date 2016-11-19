using System.Linq;
using JobTest.Core.Model;

namespace JobTest.Core.Context
{
    public class DbInitializer
    {
        public static void Initialize(SqlContext context)
        {
            context.Database.EnsureCreated();

            if (context.Companies.Any())
            {
                return;
            }

            var companies = new Company[]
                {
                    new Company {Address = "Cesta 1", Name = "Bowling Hisa"},
                    new Company {Address = "Za planko 45", Name = "Orodje d.o.o."},
                    new Company {Address = "Kandijska cesta 23", Name = "Harley Bar"},
                    new Company {Address = "Nove Jarse", Name = "Komet s.p."}
                };
            foreach (Company companys in companies)
            {
                context.Companies.Add(companys);
            }
            context.SaveChanges();

            var company = context.Companies.FirstOrDefault();

            var uses = new User[]
            {
                    new User {CompanyId = company.Id, FirstName = "Ivo", LastName = "Pivo", LoginName = "pivo"},
                    new User {CompanyId = company.Id, FirstName = "Janez", LastName = "Novak", LoginName = "novak1"},
                    new User {CompanyId = company.Id, FirstName = "Luka", LastName = "Gricar", LoginName = "luka12"},
                    new User {CompanyId = company.Id, FirstName = "Filip", LastName = "Knez", LoginName = "kfilip"}
            };

            foreach (User user in uses)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();
        }
    }
}
