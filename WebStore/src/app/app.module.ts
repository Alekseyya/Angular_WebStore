import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';


import { AboutComponent }   from './About/about.component';
import { HomeComponent }   from './Home/home.component';
import { NotFoundComponent }   from './Not-Found/not-found.component';
import { HomeHeaderComponent }   from './Headers/home-header.component';
import { CatalogComponent }   from './Catalog/catalog.component';
import { CatalogList }   from './Catalog/CatalogList/catalog-list.component';

import { MainMenuComponent }   from './MainMenu/main-menu.component';
import { RegisterComponent }   from './Users/Register/register.component';
import { LoginComponent }   from './Users/Login/login.component';

import { HttpClientModule }   from '@angular/common/http';
import { CatalogFilterPipe } from './Catalog/Filter/catalog-filter.pipe';



//catalog
import { CatalogBoard }   from './Catalog/CatalogBoard/catalog-board.component';

import { CustomFooterComponent }   from './Footer/custom-footer.component';
import { ReactiveFormsModule }   from '@angular/forms';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent},
  { path: 'catalog', component: CatalogComponent},
  { path: 'catalog/cataloglist', component: CatalogList},
  { path: '**', component: NotFoundComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,  AboutComponent, NotFoundComponent, MainMenuComponent,

    HomeComponent,
    HomeHeaderComponent,

    CatalogComponent,
    CatalogBoard,
    CatalogList,
    CatalogFilterPipe,

    RegisterComponent,
    LoginComponent,
    CustomFooterComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes),
    HttpClientModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
