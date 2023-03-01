import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
type PathMatch = "full" | "prefix" | undefined;
export const routes = [
    {path: '', component: HomeComponent}
    ,
    {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
    },
    { path: '',   redirectTo: 'app-home', pathMatch: 'full' as PathMatch },
    {path: '**', component: NotFoundComponent}

];
