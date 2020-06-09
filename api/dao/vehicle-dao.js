class VehicleDao {

	constructor(db) {
		this._db = db;
	}

	list() {
		return new Promise((resolve, reject) =>
			this._db.all(
				'SELECT * FROM vehicles',
				(error, result) => {
					if (error) return reject({message: 'Não foi possível listar os veículos!'});

					return resolve(result);
				}
			)
		);
	}

	save(vehicle) {
		return new Promise((resolve, reject) => {
			this._db.run(`INSERT INTO vehicles (
						    placa,
						    chassi,
						    renavam,
						    modelo,
						    marca,
						    ano
						) values (?, ?, ?, ?, ?, ?)
						`,
						[
							vehicle.placa,
							vehicle.chassi,
						    vehicle.renavam,
						    vehicle.modelo,
						    vehicle.marca,
						    vehicle.ano
						],
						function(error) {
							if (error) {
								return reject({message: error.message});
							}

							resolve({'id': this.lastID});
						});
		});
	}

	get(vehicle) {
		return new Promise((resolve, reject) => {
			this._db.get(`SELECT * FROM vehicles WHERE id = ?`,
							[vehicle.id],
							(error, element) => {
								if (error)
									return reject({
											message: error.message,
											status: 500
										});

								if (element)
									return resolve(element);

								return reject({
										message: `Nenhum veículo encontrado com o id ${vehicle.id}!`,
										status: 404
									});
							});
		});
	}

	remove(vehicle) {
		return new Promise((resolve, reject) => {
			this._db.run('DELETE FROM vehicles WHERE id = ?',
							vehicle.id,
							function(error) {
								if (error)
									return reject({
											success: false,
											status: 500,
											message: error.message
										});

								if (this.changes == 1)
									return resolve({
											success: true,
											message: 'Veículo removido com sucesso!'
										});

								return reject({
										success: false,
										status: 404,
										message: 'Veículo não encontrado!'
									});
							});
		});
	}

	update(vehicle) {
		return new Promise((resolve, reject) => {
			this._db.run(`UPDATE vehicles
							SET
							    placa = ?,
							    chassi = ?,
							    renavam = ?,
							    modelo = ?,
							    marca = ?,
							    ano = ?
							WHERE
								id = ?
						`,
						[
							vehicle.placa,
							vehicle.chassi,
						    vehicle.renavam,
						    vehicle.modelo,
						    vehicle.marca,
						    vehicle.ano,
						    vehicle.id
						],
						function(error) {
							if (error) {
								return reject({
											sucess: false,
											message: error.message,
											status: 500
										});
							}

							if (this.changes == 1)
								return resolve({
										success: true,
										message: 'Veículo atualizado com sucesso!'
									});

							return reject({
									success: false,
									status: 404,
									message: 'Veículo não encontrado!'
								});
						});

		});
	}
}

module.exports = VehicleDao;