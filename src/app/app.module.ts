import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteListarComponent } from './components/cliente-listar/cliente-listar.component';
import { ClienteEditarComponent } from './components/cliente-editar/cliente-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteListarComponent,
    ClienteEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
