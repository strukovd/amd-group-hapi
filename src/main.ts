import * as Hapi from '@hapi/hapi';
import { Request, ResponseToolkit } from 'hapi';
import * as dotenv from "dotenv";

class Main {
	static async initServer() {
		dotenv.config({});
		Main.checkRequiredEnv([`HOST`, `PORT`]);

		const server: Hapi.Server = Hapi.server({
			host: process.env.HOST,
			port: process.env.PORT
	   	});

		server.route({
			method: `GET`,
			path: `/`,
			handler: (request: Request, h: ResponseToolkit, error: Error) => {
				return { success: true };
			}
		});

		await server.start();
		console.log(`Сервер запущен на ${process.env.HOST}:${process.env.PORT}`);
	}

	static checkRequiredEnv(requiredFields: Array<string>) {
		const existFields: Array<string> = Object.keys(process.env);
		requiredFields.forEach(
			(reqFieldName: string) => {
				if( !existFields.includes(reqFieldName) ) {
					throw new Error(`Отсутствует обязательная переменная среды ${reqFieldName}`);
				}
			}
		);
	}
}

Main.initServer();
