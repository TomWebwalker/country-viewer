import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { ListEffects } from './store/list.effects';
import { listReducer } from './store/list.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(
      {
        list: listReducer,
      },
      {}
    ),
    BrowserAnimationsModule,
    EffectsModule.forRoot([ListEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
