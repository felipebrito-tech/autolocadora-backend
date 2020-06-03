const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const VEHICLES_SCHEMA = `
CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    placa VARCHAR(7) NOT NULL UNIQUE,
    chassi VARCHAR(17) NOT NULL UNIQUE,
    renavam VARCHAR(9) NOT NULL UNIQUE,
    modelo VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    ano INTEGER
)
`;

const INSERT_VEHICLE_1 = 
`
INSERT INTO vehicles (
    placa,
    chassi,
    renavam,
    modelo,
    marca,
    ano
) SELECT 'AAA1234', '1234567890ABCDEFG', '123456789', 'Palio', 'Fiat', 2019 WHERE NOT EXISTS (SELECT * FROM vehicles
 WHERE placa = 'AAA1234')
`;

const INSERT_VEHICLE_2 = 
`
INSERT INTO vehicles (
    placa,
    chassi,
    renavam,
    modelo,
    marca,
    ano
) SELECT 'AAA1235', '1234567890ABCDEFH', '123456780', 'Evoque', 'Range Rover', 2016 WHERE NOT EXISTS (SELECT * FROM vehicles
 WHERE placa = 'AAA1235')
`;

const INSERT_VEHICLE_3 = 
`
INSERT INTO vehicles (
    placa,
    chassi,
    renavam,
    modelo,
    marca,
    ano
) SELECT 'AAA1236', '1234567890ABCDEGI', '123456790', 'Versa', 'Nissan', 2020 WHERE NOT EXISTS (SELECT * FROM vehicles
 WHERE placa = 'AAA1236')
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(VEHICLES_SCHEMA);
    db.run(INSERT_VEHICLE_1);
    db.run(INSERT_VEHICLE_2);
    db.run(INSERT_VEHICLE_3);

    db.each("SELECT * FROM vehicles", (err, vehicle) => {
        console.log('Veículo: ');
        console.log(vehicle);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('DB closed!');
        process.exit(0);
    })
);

module.exports = db;