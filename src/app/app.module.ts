import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './components/hero/hero.component';
import { ParticlesComponent } from './components/subComponents/particles/particles.component';
import { SplineviewerdirectiveComponent } from './components/splineviewerdirective/splineviewerdirective.component';
import { EarthComponent } from './components/subComponents/earth/earth.component';
import { LogoComponent } from './components/subComponents/logo/logo.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { BackOfficeComponent } from './pages/back-office/back-office.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CustomerSpaceComponent } from './pages/customer-space/customer-space.component';
import { PurposeComponent } from './components/purpose/purpose.component';
import { KeyFeaturesComponent } from './components/key-features/key-features.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { JibiComponent } from './components/subComponents/jibi/jibi.component';
import { ProfileComponent } from './components/registerComponents/profile/profile.component';
import { PersonalInfosComponent } from './components/registerComponents/personal-infos/personal-infos.component';
import { NotificationsComponent } from './components/registerComponents/notifications/notifications.component';
import { AgentPageComponent } from './pages/agent-page/agent-page.component';
import {AgentComponent} from "./components/agent/agent.component";
import { ShowClientComponent } from './components/agentComponent/show-client/show-client.component';
import { AddClientComponent } from './components/agentComponent/add-client/add-client.component';
import { UpdateProfileComponent } from './components/agentComponent/update-profile/update-profile.component';
import { FirstAddComponent } from './components/addClientComponent/first-add/first-add.component';
import { SecondAddComponent } from './components/addClientComponent/second-add/second-add.component';
import { ThirdAddComponent } from './components/addClientComponent/third-add/third-add.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {NgOptimizedImage} from "@angular/common";
import { ClientComponent } from './components/client/client.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import { FacturesComponent } from './components/clientComponent/factures/factures.component';
import { HistoriqueComponent } from './components/clientComponent/historique/historique.component';
import { PaiementFacturesComponent } from './components/clientComponent/paiement-factures/paiement-factures.component';
import { ClientProfileComponent } from './components/clientComponent/client-profile/client-profile.component';
import { UpdatePasswordComponent } from './components/clientComponent/update-password/update-password.component';
import { SoldeComponent } from './components/clientComponent/solde/solde.component';
import { ConfirmfactureComponent } from './components/clientComponent/confirmfacture/confirmfacture.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CountdownModule } from 'ngx-countdown';
import { OtpComponent } from './components/clientComponent/otp/otp.component';
import { CreanceChosedComponent } from './components/clientComponent/creance-chosed/creance-chosed.component';
import { TransactionComponent } from './components/clientComponent/transaction/transaction.component';

import { QrCodeModule } from 'ng-qrcode';
import {GenerateQrComponent} from "./components/clientComponent/generate-qr/generate-qr.component";
import { FooterComponent } from './components/footer/footer.component';
import { FooterPageComponent } from './pages/footer-page/footer-page.component';
import { PWalletComponent } from './components/agentComponent/p-wallet/p-wallet.component';
import { FirstWalletComponent } from './components/addPWallet/first-wallet/first-wallet.component';
import { SecondWalletComponent } from './components/addPWallet/second-wallet/second-wallet.component';
import { ThirdWalletComponent } from './components/addPWallet/third-wallet/third-wallet.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroComponent,
    HeaderComponent,
    ParticlesComponent,
    SplineviewerdirectiveComponent,
    SplineviewerdirectiveComponent,
    EarthComponent,
    LogoComponent,
    LanguageSwitcherComponent,
    BackOfficeComponent,
    PaymentComponent,
    CustomerSpaceComponent,
    PurposeComponent,
    KeyFeaturesComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RegisterFormComponent,
    LoginFormComponent,
    JibiComponent,
    ProfileComponent,
    PersonalInfosComponent,
    NotificationsComponent,
    AgentPageComponent,
    AgentComponent,
    ShowClientComponent,
    AddClientComponent,
    UpdateProfileComponent,
    FirstAddComponent,
    SecondAddComponent,
    ThirdAddComponent,
    AdminComponent,
    AdminPageComponent,
    ClientComponent,
    FacturesComponent,
    HistoriqueComponent,
    PaiementFacturesComponent,
    ClientProfileComponent,
    UpdatePasswordComponent,
    SoldeComponent,
    ConfirmfactureComponent,
    OtpComponent,
    CreanceChosedComponent,
    TransactionComponent,
    GenerateQrComponent,
    FooterComponent,
    FooterPageComponent,
    PWalletComponent,
    FirstWalletComponent,
    SecondWalletComponent,
    ThirdWalletComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgOptimizedImage,
        SlickCarouselModule,
       SweetAlert2Module.forRoot(),


    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line

})
export class AppModule { }
