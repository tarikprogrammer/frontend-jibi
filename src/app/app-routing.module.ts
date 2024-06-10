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
import {AuthGuard, AuthGuardClient} from "./guards/guard.guard";
import {AgentComponent} from "./components/agent/agent.component";
import {ClientComponent} from "./components/client/client.component";
import {FacturesComponent} from "./components/clientComponent/factures/factures.component";
import {HistoriqueComponent} from "./components/clientComponent/historique/historique.component";
import {PaiementFacturesComponent} from "./components/clientComponent/paiement-factures/paiement-factures.component";
import {ClientProfileComponent} from "./components/clientComponent/client-profile/client-profile.component";
import {UpdatePasswordComponent} from "./components/clientComponent/update-password/update-password.component";
import {SoldeComponent} from "./components/clientComponent/solde/solde.component";
import {ConfirmfactureComponent} from "./components/clientComponent/confirmfacture/confirmfacture.component";
import {OtpComponent} from "./components/clientComponent/otp/otp.component";
import {CreanceChosedComponent} from "./components/clientComponent/creance-chosed/creance-chosed.component";
import {TransactionComponent} from "./components/clientComponent/transaction/transaction.component";
import {GenerateQrComponent} from "./components/clientComponent/generate-qr/generate-qr.component";
import {PWalletComponent} from "./components/agentComponent/p-wallet/p-wallet.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'back-office', component: BackOfficeComponent },
  { path: 'customer-space', component: CustomerSpaceComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'signup', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  {path:'agent',component:AgentComponent,canActivate:[AuthGuard],children:[
      {path:'add',component:AddClientComponent},
      {path:'profile',component:UpdateProfileComponent},
      {path:'clients',component:ShowClientComponent},
      { path: 'login', component: LoginPageComponent },
      {path:'p-wallet',component:PWalletComponent}
    ]},
  {path:'admin',component:AdminPageComponent},
  {path:'client',component:ClientComponent,canActivate:[AuthGuardClient],children:[{
    path:'factures',component: FacturesComponent,children:[
        {path:'historiques',component: HistoriqueComponent},
        {path:'factures',component: FacturesComponent},
        {path:'paiement',component:PaiementFacturesComponent},
        {path:'confirm',component:ConfirmfactureComponent},
        {path:'otp',component:OtpComponent},
        {path:'creance',component:CreanceChosedComponent},

      ]

    },
      {path:'profile',component:ClientProfileComponent },
      {path:'update-password',component:UpdatePasswordComponent },
      {path:'solde',component:SoldeComponent},
      {path:'transaction',component:TransactionComponent},
      {path:'generateQr',component:GenerateQrComponent}


    ]},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
