import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./pages/home/home.component";
import {BackOfficeComponent} from "./pages/back-office/back-office.component";
import {CustomerSpaceComponent} from "./pages/customer-space/customer-space.component";
import {PaymentComponent} from "./pages/payment/payment.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AgentPageComponent} from "./pages/agent-page/agent-page.component";
import {AddClientComponent} from "./components/agentComponent/add-client/add-client.component";
import {UpdateProfileComponent} from "./components/agentComponent/update-profile/update-profile.component";
import {ShowClientComponent} from "./components/agentComponent/show-client/show-client.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {AuthGuard} from "./guards/guard.guard";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'back-office', component: BackOfficeComponent },
  { path: 'customer-space', component: CustomerSpaceComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'signup', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  {path:'agent',component:AgentPageComponent,canActivate:[AuthGuard],children:[
      {path:'add',component:AddClientComponent},
      {path:'profile',component:UpdateProfileComponent},
      {path:'clients',component:ShowClientComponent},
    ]},
  {path:'admin',component:AdminPageComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
