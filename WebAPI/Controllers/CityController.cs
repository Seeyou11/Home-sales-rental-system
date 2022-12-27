using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;
//using WebAPI.Models;

namespace WebAPI.Controllers
{
    //[Authorize]
    public class CityController : BaseController
    {

        private readonly IUnitOfWork uow;
        public IMapper mapper { get; }

        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this.mapper = mapper;
            this.uow = uow;

        }

        //Get api/city
        [HttpGet("cities")]
        /*kelay authorized yalnew yetefekedelet sew bicha new acces madereg michlew then
         allowanonymous demo yfekdal*/
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.cityrepository.GetCitiesAsync();
            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);
            return Ok(citiesDto);

        }


        //Post api/city/Post --- post the data in json format
        [HttpPost("post")]

        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
            uow.cityrepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);

        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            if (id != cityDto.Id)
                return BadRequest("Update are not allowed");

            var cityFromDb = await uow.cityrepository.FindCity(id);

            if (cityFromDb == null)
                return BadRequest("Update are not allowed");
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);

            throw new Exception("Some unknown error occured");
            await uow.SaveAsync();
            return StatusCode(200);



        }


        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityupdateDto)
        {
            var cityFromDb = await uow.cityrepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityupdateDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }
        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> cityToPatch)
        {
            var cityFromDb = await uow.cityrepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;

            cityToPatch.ApplyTo(cityFromDb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.cityrepository.DeleteCity(id);
            await uow.SaveAsync();
            return StatusCode(201);

        }



    }
}