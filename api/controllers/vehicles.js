module.exports = app => {
	const db = require('../../config/database');
	const VehicleDao = require('../dao/vehicle-dao');
	const controller = {};

	controller.listVehicles = (req, res) => {
		const vehicleDao = new VehicleDao(db);

		vehicleDao.list()
					.then(vehicles => res.status(200).json(vehicles))
					.catch(error => console.log(error));
	}

	controller.saveVehicle = (req, res) => {
		const vehicleDao = new VehicleDao(db);

		vehicleDao.save(req.body)
		.then(vehicle => res.status(201).json(vehicle))
		.catch(error => res.status(500).json(error));		
	}

	controller.showVehicle = (req, res) => {
		const vehicleDao = new VehicleDao(db);

		vehicleDao.get(req.params)
					.then(vehicle => res.status(200).json(vehicle))
					.catch(error => res.status(error.status).json(error));
	}

	controller.removeVehicle = (req, res) => {
		const vehicleDao = new VehicleDao(db);

		vehicleDao.remove(req.params)
					.then(success => res.status(200).json(success))
					.catch(error => res.status(error.status).json(error));
	}

	controller.updateVehicle = (req, res) => {
		const vehicleDao = new VehicleDao(db);

		req.body.id = req.params.id;

		vehicleDao.update(req.body)
					.then(success => res.status(200).json(success))
					.catch(error => res.status(error.status).json(error));
	}

	return controller;
}