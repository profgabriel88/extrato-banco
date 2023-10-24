using System.Linq;
using ContaCorrente.Data;
using ContaCorrente.Domain;
using ContaCorrenteServices.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ContaCorrenteServices
{
    public class ExtratoService : IExtratoService
    {
        private readonly ExtratoContext _context;

        public ExtratoService(ExtratoContext context)
        {
            _context = context;
        }
        public async Task<List<Extrato>> GetExtratosByDate(string inicio, string? fim)
        {
            var dataInicio = DateTime.Parse(inicio);
            var dataFim = new DateTime();
            if (fim == null)
                dataFim = dataInicio.AddDays(2);

            else
                dataFim = DateTime.Parse(fim);

            var query = from e in _context.Extratos where e.Data >= dataInicio && e.Data <= dataFim select e;
            return query.ToList();
        }

        public async Task<List<Extrato>> GetExtratos()
        {
            return _context.Extratos.ToList();
        }

        public async Task<Guid> CreateExtrato(Extrato novoExtrato)
        {
            novoExtrato.Id = Guid.NewGuid();
            _context.Add(novoExtrato);
            await _context.SaveChangesAsync();
            return novoExtrato.Id;
        }

        public async Task EditExtrato(Extrato extrato)
        {
            _context.Update(extrato);
            await _context.SaveChangesAsync();
        }

        public async Task CancelExtrato(Guid extratoId)
        {
            var extrato = await _context.Extratos.FirstOrDefaultAsync(x => x.Id == extratoId);
            extrato.Status = "Cancelado";
            _context.Update(extrato);
            await _context.SaveChangesAsync();
        }
    }
}