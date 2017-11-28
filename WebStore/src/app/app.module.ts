import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';


import { AboutComponent }   from './About/about.component';
import { HomeComponent }   from './Home/home.component';
import { NotFoundComponent }   from './Not-Found/not-found.component';
import { HomeHeaderComponent }   from './Headers/home-header.component';

import { MainMenuComponent }   from './MainMenu/main-menu.component';




//catalog
import { CatalogBoard }   from './Catalog/CatalogBoard/catalog-board.component';

import { CustomFooterComponent }   from './Footer/custom-footer.component';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,  AboutComponent, NotFoundComponent, MainMenuComponent,

    HomeComponent,
    HomeHeaderComponent,

    CatalogBoard,


    CustomFooterComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
