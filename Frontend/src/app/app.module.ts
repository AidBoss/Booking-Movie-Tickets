import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from "./share/layout/layout.module";
import { UserModule } from "./views/user/user.module";
import { AdminModule } from "./views/admin/admin.module";
import { AuthModule } from "./views/auth/auth.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { AdminGuard } from "./core/constants/admin.guard";
import { IndexedDbService } from './core/services/indexeddb/indexed-db.service';
import { AuthService } from "./core/services/api/auth.service";
import {AuthGuard} from "./core/constants/auth.guard";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    UserModule,
    AdminModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [
    IndexedDbService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AdminGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
