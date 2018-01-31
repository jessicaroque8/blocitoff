import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {

  constructor(
     public db: AngularFireDatabase
  ) { }

// Returns an Observable.
  getTasks() {
     return this.db.list('tasks').valueChanges();
  }

}
