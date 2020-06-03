module.exports = app => {
	const controller = app.controllers.vehicles;

	app.route('/api/vehicles')
		.get(controller.listVehicles)
		.post(controller.saveVehicle);

	app.route('/api/vehicles/:id')
		.get(controller.showVehicle)
		.delete(controller.removeVehicle)
		.put(controller.updateVehicle);
}