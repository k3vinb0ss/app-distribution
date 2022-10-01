import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import { initProcessLogs } from './utils/logger';
import Singleton from './utils/singleton';

validateEnv();
initProcessLogs();

(async () => {
    const app = new App();

    app.initialize([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

    app.listen();
})()
    .then(async () => {
        await Singleton.instance.prisma.$disconnect();
    })
    .catch(async e => {
        console.error(e);
        await Singleton.instance.prisma.$disconnect();
    });
