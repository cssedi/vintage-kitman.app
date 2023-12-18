﻿namespace vintage_kitman_API.Model
{
    public class CustomOrder
    {
        public int CustomOrderId { get; set; }
        public string Size { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public bool? IsSourcable { get; set; }
        public string? CustomName { get; set; }
        public int? CustomNumber { get; set; }
        public string Id { get; set; }
        //navigation
        public User User { get; set; }

    }
}