using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence.Migrations
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Products.Any()) return;


            var products = new List<Product>
            {
                new Product
                {
                    Title = "Impact whey protein 1",
                    Description  = "Best protein on the market",
                    Image = "Protein",
                    Price = 79.99f
                },

                new Product
                {
                    Title = "Creatin Monohydrat 1",
                    Description  = "Best creatine on the market",
                    Image = "Creatin",
                    Price = 29.99f
                },

                new Product
                {
                    Title = "Omega-3 Capsule 1",
                    Description  = "Easy to use",
                    Image = "Vitamin",
                    Price = 19.99f
                },

                new Product
                {
                    Title = "Protein bar",
                    Description  = "Very good protein snack",
                    Image = "Protein food",
                    Price = 2.99f
                },

                new Product
                {
                    Title = "Zync Capsule",
                    Description  = "Drink twice a day",
                    Image = "Vitamin",
                    Price = 19.99f
                },
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}