using ContaCorrente.Domain;
using Microsoft.EntityFrameworkCore;

namespace ContaCorrente.Data
{
    public class ExtratoContext : DbContext
    {
        public ExtratoContext (DbContextOptions<ExtratoContext> options) : base(options) {}
        public virtual DbSet<Extrato> Extratos { get; set; }
    }
}
