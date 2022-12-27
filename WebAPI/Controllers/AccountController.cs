using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        public readonly IUnitOfWork uow;
        public IConfiguration configuration;
        public AccountController(IUnitOfWork uow, IConfiguration configuration)
        {
            this.configuration = configuration;
            this.uow = uow;

        }

        //api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginreq)
        {
            var user = await uow.userRepository.Authenticate(loginreq.UserName, loginreq.Password);
            if (user == null)
            {
                return Unauthorized("Invalid user ID or Password");
            }

            var LoginRes = new LoginResDto();
            LoginRes.UserName = user.Username;
            LoginRes.Token = CreateJWT(user);
            return Ok(LoginRes);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            //try
            //{
            //    if (await uow.userRepository.UserAlreadyExists(registerDto.UserName))
            //        return BadRequest("User Already exists, please try something else");

            //    uow.userRepository.Register(registerDto.UserName, registerDto.Password, registerDto.Email, registerDto.MobileNumber);
            //    await uow.SaveAsync();
            //    return StatusCode(201);
            //}
            //catch(Exception ex)
            //{
            //    return BadRequest();
            //}

            if (await uow.userRepository.UserAlreadyExists(registerDto.UserName))
                return BadRequest("User Already exists, please try something else");

            uow.userRepository.Register(registerDto.UserName, registerDto.Password, registerDto.Email, registerDto.MobileNumber);
            await uow.SaveAsync();
            return StatusCode(201);
        }


        private string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                        .GetBytes(secretKey));

            var claims = new Claim[] {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature
            );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}