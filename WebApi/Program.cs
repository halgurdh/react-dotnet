using Microsoft.OpenApi.Models;
using WebApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options=>
{
    options.AddPolicy("CORSPolicy", 
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "https://appname.azure.net");
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( SwaggerGenOptions => 
{
    SwaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP.Net + React", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "APS.NET + React";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API Post model");
    swaggerUIOptions.RoutePrefix = string.Empty; 
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.MapGet("/getAllPosts", async () => await PostsRepository.GetPostsAsync())
    .WithTags("Post EndPoints");

app.MapGet("/getPostById/{postId}", async (int postId) =>
{
    Post postToReturn = await PostsRepository.GetPostByIdAsync(postId);

    if (postToReturn != null)
    {
        return Results.Ok(postToReturn);
    }
    else
    {
        return Results.BadRequest();
    }

}).WithTags("Posts EndPoints");

app.MapPost("/createPost", async (Post postToCreate) =>
{
    bool createSuccessful = await PostsRepository.CreatePostAsync(postToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Create Successful");
    }
    else
    {
        return Results.BadRequest();
    }

}).WithTags("Posts EndPoints");

app.MapPut("/updatePost", async (Post postToUpdate) =>
{
    bool updateSuccessful = await PostsRepository.UpdatePostAsync(postToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }

}).WithTags("Posts EndPoints");


app.MapDelete("/deletePostById/{postId}", async (int postId) =>
{
    bool deleteSuccessful = await PostsRepository.DeletePostAsync(postId);

    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }

}).WithTags("Posts EndPoints");

app.Run();
