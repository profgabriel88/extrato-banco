using ContaCorrente.Domain;

namespace ContaCorrenteServices.Interfaces
{
    public interface IExtratoService
    {
        Task<List<Extrato>> GetExtratosByDate(string inicio, string? fim);
        Task<List<Extrato>> GetExtratos();
        Task<Guid> CreateExtrato(Extrato novoExtrato);
        Task EditExtrato(Extrato extrato);
        Task CancelExtrato(Guid extratoId);
    }
}