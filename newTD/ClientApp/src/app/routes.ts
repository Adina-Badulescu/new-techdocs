import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./home/navbar/login/login.component";
import { RegisterComponent } from "./home/navbar/register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./services/jwt/auth.guard";
type PathMatch = "full" | "prefix" | undefined;
export const routes = [
    {path: '', component: HomeComponent},
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },    
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canLoad:[AuthGuard]
    },
    {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
    },
    { path: '',   redirectTo: 'app-home', pathMatch: 'full' as PathMatch },
    {path: '**', component: NotFoundComponent}

];
