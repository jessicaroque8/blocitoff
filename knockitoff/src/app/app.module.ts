import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TasksComponent } from './tasks/tasks.component';

import { FirebaseService } from './firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'knockitoff'),
    AngularFireDatabaseModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
