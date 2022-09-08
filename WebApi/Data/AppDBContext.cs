using Microsoft.EntityFrameworkCore;

namespace WebApi.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Post[] postsToSeed = new Post[6];

            for (int i = 1; i <= postsToSeed.Length; i++)
            {
                postsToSeed[i-1] = new Post
                {
                    PostId = i,
                    Title = $"Post {i}",
                    Content = $"This is post {i} description"
                };
            }

            modelBuilder.Entity<Post>().HasData(postsToSeed);
        }
    }
}