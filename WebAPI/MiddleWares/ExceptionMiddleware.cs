using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;



namespace WebAPI.Extensions
{

    public class ExceptionMiddleware
    {
        public readonly RequestDelegate next;
        public ExceptionMiddleware(RequestDelegate next)
        {
            this.next = next;

        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception error)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(error.Message);
                // var response = context.Response;
                // response.ContentType = "application/json";

                // switch (error)
                // {
                //     case AppException e:
                //         // custom application error
                //         response.StatusCode = (int)HttpStatusCode.BadRequest;
                //         break;
                //     case KeyNotFoundException e:
                //         // not found error
                //         response.StatusCode = (int)HttpStatusCode.NotFound;
                //         break;
                //     default:
                //         // unhandled error
                //         response.StatusCode = (int)HttpStatusCode.InternalServerError;
                //         break;
                // }

                // var result = JsonSerializer.Serialize(new { message = error?.Message });
                // await response.WriteAsync(result);
            }
        }
    }
}