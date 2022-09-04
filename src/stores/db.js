export const providers = {
  elmo: [
    {
      name: "Rent1",
      cars: [
        "Volkswagen e-Up '19",
        "Skoda Citigo",
        "Toyota Yaris",
        "Nissan Leaf",
      ],
      price: {
        km: 0.2,
        minute: 0.11,
        hour: 6.6,
        day: 30,
        week: 225,
        month: 700,
      },
    },
    {
      name: "Rent2",
      cars: ["Volkswagen e-Up '20", "Renault Clio"],
      price: {
        km: 0.2,
        minute: 0.11,
        hour: 6.6,
        day: 35,
        week: 260,
        month: 799,
      },
    },
    {
      name: "Rent3",
      cars: ["Renault Zoe", "Peugeot e-208 GT"],
      price: {
        km: 0.2,
        minute: 0.13,
        hour: 7.8,
        day: 42,
        week: 275,
        month: 825,
      },
    },
    {
      name: "Rent4",
      cars: ["Renault Arkana", "Audi A5"],
      price: {
        km: 0.22,
        minute: 0.15,
        hour: 9,
        day: 49,
        week: 350,
        month: 890,
      },
    },
    {
      name: "Rent5",
      cars: ["Tesla Model 3 SR+"],
      price: {
        km: 0.22,
        minute: 0.25,
        hour: 15,
        day: 99,
        week: 525,
        month: 1599,
      },
      min_price: 30,
    },
  ],
  beast: [
    {
      name: "Tesla Model 3 Standard Range",
      price: {
        km: 0.2,
        first30mins: 14.99,
        minute: 0.22,
        day: 119.99,
        "3days": 289.99,
        week: 549.99,
      },
    },
    {
      name: "Tesla Model 3 Long Range",
      price: {
        km: 0.2,
        first30mins: 19.99,
        minute: 0.25,
        day: 139.99,
        "3days": 339.99,
        week: 549.99,
      },
    },
    {
      name: "Tesla Model 3 Performance",
      price: {
        km: 0.2,
        first30mins: 24.99,
        minute: 0.29,
        day: 159.99,
        "3days": 379.99,
        week: 749.99,
      },
    },
    {
      name: "Tesla Model Y Long Range",
      price: {
        km: 0.25,
        first30mins: 24.99,
        minute: 0.35,
        day: 189.99,
        "3days": 459.99,
        week: 899.99,
      },
    },
    {
      name: "Tesla Model X Ludicrous Perf",
      price: {
        km: 0.3,
        first30mins: 39.99,
        minute: 0.49,
        day: 269.99,
        "3days": 649.99,
        week: 1299.99,
      },
    },
  ],
  citybee: [
    {
      name: "Toyota Yaris",
      price: {
        km: 0.22,
        minute: 0.15,
        hour: 6.39,
        day: 28.39,
      },
    },
    {
      name: "Peugeot 208",
      price: {
        km: 0.22,
        minute: 0.15,
        hour: 6.39,
        day: 28.39,
      },
    },
    {
      name: "Citroen C3",
      price: {
        km: 0.22,
        minute: 0.15,
        hour: 6.39,
        day: 28.39,
      },
    },
    {
      name: "Ford Fiesta",
      price: {
        km: 0.22,
        minute: 0.15,
        hour: 6.39,
        day: 28.39,
      },
    },
    {
      name: "Toyota Corolla",
      price: {
        km: 0.24,
        minute: 0.17,
        hour: 7.19,
        day: 34.89,
      },
    },
    {
      name: "Volkswagen Golf 8",
      price: {
        km: 0.24,
        minute: 0.18,
        hour: 7.59,
        day: 35.39,
      },
    },
    {
      name: "Ford Focus",
      price: {
        km: 0.24,
        minute: 0.21,
        hour: 8.79,
        day: 39.49,
      },
    },
    {
      name: "BMW 118i",
      price: {
        km: 0.26,
        minute: 0.23,
        hour: 9.29,
        day: 44.49,
      },
    },
    {
      name: "Volkswagen T-Cross",
      price: {
        km: 0.24,
        minute: 0.18,
        hour: 7.59,
        day: 35.39,
      },
    },
    {
      name: "Nissan Juke",
      price: {
        km: 0.24,
        minute: 0.18,
        hour: 7.59,
        day: 35.39,
      },
    },
    {
      name: "Toyota C-HR",
      price: {
        km: 0.24,
        minute: 0.19,
        hour: 7.99,
        day: 35.89,
      },
    },
    {
      name: "Toyota Yaris Cross",
      price: {
        km: 0.24,
        minute: 0.2,
        hour: 8.39,
        day: 37.69,
      },
    },
    {
      name: "Volkswagen Taigo",
      price: {
        km: 0.24,
        minute: 0.2,
        hour: 8.39,
        day: 37.69,
      },
    },
    {
      name: "Peugeot 2008",
      price: {
        km: 0.24,
        minute: 0.21,
        hour: 8.79,
        day: 39.49,
      },
    },
    {
      name: "Volkswagen T-Roc",
      price: {
        km: 0.25,
        minute: 0.22,
        hour: 9.19,
        day: 41.29,
      },
    },
    {
      name: "Volkswagen T-Roc R-Line",
      price: {
        km: 0.26,
        minute: 0.23,
        hour: 9.75,
        day: 45.99,
      },
    },
    {
      name: "Jeep Compass",
      price: {
        km: 0.26,
        minute: 0.23,
        hour: 9.75,
        day: 45.99,
      },
    },
    {
      name: "Ford Kuga",
      price: {
        km: 0.26,
        minute: 0.23,
        hour: 9.75,
        day: 45.99,
      },
    },
    {
      name: "Toyota RAV4",
      price: {
        km: 0.27,
        minute: 0.24,
        hour: 9.84,
        day: 48.89,
      },
    },
    {
      name: "BMW X1",
      price: {
        km: 0.29,
        minute: 0.27,
        hour: 10.99,
        day: 52.99,
      },
    },
    {
      name: "Skoda Kamiq",
      price: {
        km: 0.25,
        minute: 0.22,
        hour: 9.19,
        day: 41.29,
      },
    },
    {
      name: "Volkswagen Crafter",
      price: {
        km: 0.27,
        minute: 0.27,
        hour: 8.9,
        day: 39.9,
      },
    },
    {
      name: "Renault Master",
      price: {
        km: 0.27,
        minute: 0.27,
        hour: 8.9,
        day: 39.9,
      },
    },
  ],
  bolt: [
    {
      name: "Toyota Corolla",
      price: {
        km: 0.24,
        minute: 0.14,
        hour: 5.89,
        day: 27.9,
      },
    },
    {
      name: "Škoda Octavia",
      price: {
        km: 0.23,
        minute: 0.12,
        hour: 4.99,
        day: 27.9,
      },
    },
    {
      name: "Audi A1",
      price: {
        km: 0.22,
        minute: 0.16,
        hour: 7.99,
        day: 30.9,
      },
    },
    {
      name: "Audi A3",
      price: {
        km: 0.24,
        minute: 0.16,
        hour: 7.99,
        day: 30.9,
      },
    },
    {
      name: "Hyundai i20",
      price: {
        km: 0.23,
        minute: 0.12,
        hour: 4.99,
        day: 27.9,
      },
    },
    {
      name: "Toyota Yaris",
      price: {
        km: 0.2,
        minute: 0.12,
        hour: 4.49,
        day: 19.9,
      },
    },
    {
      name: "Škoda Scala",
      price: {
        km: 0.24,
        minute: 0.14,
        hour: 5.89,
        day: 27.9,
      },
    },
    {
      name: "VW ID.3",
      price: {
        km: 0.24,
        minute: 0.14,
        hour: 7.39,
        day: 33.9,
      },
    },
    {
      name: "Toyota Yaris Cross",
      price: {
        km: 0.24,
        minute: 0.14,
        hour: 5.89,
        day: 27.9,
      },
    },
    {
      name: "VW T-Cross",
      price: {
        km: 0.24,
        minute: 0.15,
        hour: 6.79,
        day: 30.9,
      },
    },
    {
      name: "Audi Q2",
      price: {
        km: 0.24,
        minute: 0.16,
        hour: 7.99,
        day: 30.9,
      },
    },
    {
      name: "VW T-Roc",
      price: {
        km: 0.24,
        minute: 0.15,
        hour: 6.79,
        day: 30.9,
      },
    },
    {
      name: "Škoda Kamiq",
      price: {
        km: 0.24,
        minute: 0.14,
        hour: 5.89,
        day: 27.9,
      },
    },
    {
      name: "Toyota C-HR",
      price: {
        km: 0.24,
        minute: 0.14,
        hour: 5.89,
        day: 27.9,
      },
    },
    {
      name: "Audi e-tron",
      price: {
        km: 0.25,
        minute: 0.69,
        hour: 39.9,
        day: 149.9,
      },
    },
    {
      name: "Toyota RAV4",
      price: {
        km: 0.25,
        minute: 0.3,
        hour: 12.9,
        day: 43.9,
      },
    },
    {
      name: "BMW 4 Convertible",
      price: {
        km: 0.35,
        minute: 0.49,
        hour: 25,
        day: 119.9,
      },
    },
    {
      name: "VW T-Roc Cabrio",
      price: {
        km: 0.25,
        minute: 0.3,
        hour: 16.9,
        day: 54.9,
      },
    },
    {
      name: "VW Arteon",
      price: {
        km: 0.25,
        minute: 0.3,
        hour: 12.9,
        day: 43.9,
      },
    },
    {
      name: "Toyota Land Cruiser",
      price: {
        km: 0.34,
        minute: 0.49,
        hour: 19.9,
        day: 79.9,
      },
    },
    {
      name: "Mercedes Sprinter",
      price: {
        km: 0.27,
        minute: 0.15,
        hour: 6.9,
        day: 37.9,
      },
    },
    {
      name: "VW Crafter",
      price: {
        km: 0.27,
        minute: 0.13,
        hour: 6.9,
        day: 35.9,
      },
    },
  ],
};
