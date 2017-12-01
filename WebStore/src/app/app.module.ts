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

import { HttpClientModule }   from '@angular/common/http';



//catalog
import { CatalogBoard }   from './Catalog/CatalogBoard/catalog-board.component';

import { CustomFooterComponent }   from './Footer/custom-footer.component';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
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


    CustomFooterComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
