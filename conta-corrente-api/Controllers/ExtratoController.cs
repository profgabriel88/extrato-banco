using System.Diagnostics;
using ContaCorrente.Domain;
using ContaCorrenteServices.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace conta_corrente_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExtratoController : ControllerBase
{
    private readonly ILogger<ExtratoController> _logger;
    private readonly IExtratoService _extratoService;

    public ExtratoController(ILogger<ExtratoController> logger, IExtratoService extratoService)
    {
        _logger = logger;
        _extratoService = extratoService;
    }

    [HttpGet]
    public async Task<List<Extrato>> GetExtratos([FromQuery] string inicio, [FromQuery] string? fim)
    {
        return await _extratoService.GetExtratosByDate(inicio, fim);
    }

    [HttpPost]
    public async Task<IActionResult> CreateExtrato ([FromBody] Extrato novoExtrato)
    {
        try
        {
            var id = await _extratoService.CreateExtrato(novoExtrato);

            return CreatedAtAction(nameof(CreateExtrato), id);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> EditExtrato ([FromBody] Extrato extrato)
    {
        try
        {
            await _extratoService.EditExtrato(extrato);
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("cancel")]
    public async Task<IActionResult> CancelExtrato ([FromQuery] Guid extratoId)
    {
        try
        {
            await _extratoService.CancelExtrato(extratoId);
            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}
