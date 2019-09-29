using System;

namespace DataAccess.Entities
{
    public class Value
    {
        public Guid Id { get; set; }

        public int? IntValue { get; set; }

        public double? DoubleValue { get; set; }

        public DateTime? DateTimeValue { get; set; }

        public string StringValue { get; set; }
    }
}
