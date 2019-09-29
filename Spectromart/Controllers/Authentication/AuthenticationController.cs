using AutoMapper;
using BusinessLayer.Services.Contracts.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Spectromart.Controllers.Authentication.Contracts;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MCPU.WEB.API.Controllers.Users
{
    [Authorize]
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IMapper _mapper;

        public AuthenticationController(IAuthenticationService authenticationService, IMapper mapper)
        {
            _authenticationService = authenticationService;
            _mapper = mapper;
        }       

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<LoginResult> Login([FromBody] LoginContract contract)
        {
            //var user = _userService.Authenticate(userDto.Username, userDto.Password);

            //if (user == null)
            //     return BadRequest("Username or password is incorrect");

            var refreshToken = Guid.NewGuid();

            var loginServiceContract = _mapper.Map<LoginServiceContract>(contract);

            //loginServiceContract.UserIp = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            loginServiceContract.RefreshToken = refreshToken;

            var loginServiceResult = await _authenticationService.Login(loginServiceContract);

            string encodedJwt = null;

            if (loginServiceResult.Success)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, contract.Login),
                    new Claim(ClaimTypes.NameIdentifier, loginServiceResult.UserId.ToString()),
                };
                var identity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                var now = DateTime.UtcNow;

                // создаем JWT-токен
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("authentification_security_key!qwe123"));

                var jwt = new JwtSecurityToken(
                        issuer: "SpectromartPortal",
                        audience: "Spectromart",
                        notBefore: now,
                        claims: identity.Claims,
                        expires: now.Add(TimeSpan.FromMinutes(30)),
                        signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));
                encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            }

            // return basic user info (without password) and token to store client side
            return await Task.FromResult(new LoginResult
            {
                Login = contract.Login,
                UserId = loginServiceResult.UserId,
                UserName = loginServiceResult.UserName,
                GiveinPlaceId = contract.GiveinPlaceId,
                AccessToken = encodedJwt,
                RefreshToken = refreshToken,
                ExpirationTime = DateTime.Now
                    .AddMinutes(30)
                    .AddSeconds(-10), //чтобы из-за задержек не получалось так, что токен уже просрочился, но ещё не обновился.
                IdleTimeout = 30,
                Error = loginServiceResult.Error,
            });
        }

        [HttpPost("logout")]
        public void Logout()
        {
            if (Guid.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out Guid userId))
            {
                _authenticationService.Logout(userId);
            }
        }

        [AllowAnonymous]
        [HttpPost("refreshtoken")]
        public RefreshTokenResult RefreshToken([FromBody] RefreshTokenContract contract)
        {
            ClaimsPrincipal сlaimsPrincipal = null;
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("authentification_security_key!qwe123"));
            try
            {
                сlaimsPrincipal = new JwtSecurityTokenHandler().ValidateToken(contract.AccessToken, new TokenValidationParameters
                { 
                    ValidIssuer = "SpectromartPortal",
                    ValidAudience = "Spectromart",
                    IssuerSigningKey = key,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero
                }, out var securityToken);

                if (!(securityToken is JwtSecurityToken jwtSecurityToken) || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");
            }
            catch (Exception e)
            {
                // invalid token/signing key was passed and we can't extract user claims
                //NLogHelper.Error("Ошибка при валидации токена", e);
                return null;
            }

            var userIdStr = сlaimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var login = сlaimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimsIdentity.DefaultNameClaimType)?.Value;

            if (!Guid.TryParse(userIdStr, out Guid userId))
            {
                return null;
            }

            var newRefreshToken = Guid.NewGuid();
            _authenticationService.UpdateRefreshToken(userId, contract.RefreshToken, newRefreshToken);

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, login),
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            };
            var identity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: "SpectromartPortal",
                    audience: "Spectromart",
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(30)),
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new RefreshTokenResult
            {
                AccessToken = encodedJwt,
                RefreshToken = newRefreshToken,
                ExpirationTime = DateTime.Now.AddMinutes(30),
            };
        }
    }
}
