'use strict';

/**
 * Custom routes for product to ensure public access for listing and retrieving.
 * Setting `config.auth = false` makes the endpoints publicly accessible (no JWT required).
 */
module.exports = {
	routes: [
		{
			method: 'GET',
			path: '/products',
			handler: 'product.find',
			config: { auth: false },
		},
		{
			method: 'GET',
			path: '/products/:id',
			handler: 'product.findOne',
			config: { auth: false },
		},
		// Keep other default core routes protected (create/update/delete) if desired
	],
};
