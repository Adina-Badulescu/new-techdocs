import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes = [
    {path: 'app-root', component: AppComponent },
    {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
    },
    {path: '**', component: NotFoundComponent}
];