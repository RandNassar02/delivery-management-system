export type Categories =
  | 'Indoor Plants'
  | 'Outdoor Plants'
  | 'Edible Plants'
  | 'Gardening Tools';

export interface Plants {
  id: number;
  name: string;
  gategory: Categories;
  price: number;
  image: string;
  description: string;
}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ لازم تضيف هذا

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // ✅ ضيف هنا
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
