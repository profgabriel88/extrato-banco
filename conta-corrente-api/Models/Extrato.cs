using System.ComponentModel.DataAnnotations;

namespace ContaCorrente.Domain
{
    public class Extrato
    {
        [Key]
        public Guid Id { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public decimal Valor { get; set; }
        public bool Avulso { get; set; }
        public string Status { get; set; }
    }
}