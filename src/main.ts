import * as Hapi from '@hapi/hapi';
import { Request, ResponseToolkit } from 'hapi';
import * as dotenv from "dotenv";

/*
Приложение имеет несколько роутов:
	POST /registration (после регистрации пользователя, нужно создавать кошелек (в транзации))
	POST /signin
	POST /logout
	POST /refresh - обновления токен,

	after authorization:
		GET /user - Список всех пользователей
		GET /user/search/:email - поиск пользователей по почте
		GET /user/:id - Получение пользователя по id
		PUT /user - Изменение имени и фамилии пользователя
		/stats - количество зарегистрированных пользователей за посл. месяц.

		UserModel:
			id, username, email, displayname, created, updated
		WalletModel:
			id, balance, userId


	(Необязательно) По желанию реализовать:
		POST /friend • Добавление пользователя в друзья.
		DELETE /friend/:id • Удаление пользователя из друзей
		GET /friend

		GET /friends/:username • Получение списка друзей пользователя по ID.
	    GET /count-friends/:username • Статистика количества друзей пользователя.

	(Необязательно) По желанию реализовать:
	POST /post • создания постов пользователя
    DELETE /post • удаления постов пользователя
	GET /post
		PostModel:
			id, userId, title, content


	SWAGGER AND VALIDATION:
		schemas/ - папка с файлами схем для валидации входящих данных и для построения swagger
		Joi (Валидация)


	TESTS
		Jest (Тесты)
*/
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
