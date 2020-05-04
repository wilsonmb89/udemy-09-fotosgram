import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpInterceptorService } from './services/interceptors/http-interceptor/http-interceptor.service';
import { HttpErrorInterceptorService } from './services/interceptors/http-error-interceptor/http-error-interceptor.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';

export const httpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpInterceptorService,
  multi: true
};
export const httpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptorService,
  multi: true
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    httpInterceptorProvider,
    httpErrorInterceptorProvider,
    Geolocation,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
