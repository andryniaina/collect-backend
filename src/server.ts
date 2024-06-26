import { startServer } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { FormRoute } from '@routes/forms.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

startServer([UserRoute, AuthRoute, FormRoute]);
