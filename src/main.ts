import * as Hapi from '@hapi/hapi';
import { Request, ResponseToolkit } from 'hapi';

class Main {
	static async initServer() {
		const server: Hapi.Server = Hapi.server({
			host: `localhost`,
			port: 5555
	   	});

		server.route({
			method: `GET`,
			path: `/`,
			handler: (request: Request, h: ResponseToolkit, error: Error) => {
				return { success: true };
			}
		});

		await server.start();
		console.log(`Server started at localhost:5555`);
	}
}

Main.initServer();
