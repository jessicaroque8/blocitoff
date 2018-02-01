import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class FirebaseService {

  selectedTasks$: Observable<any[]>;
  state$: BehaviorSubject<string|null>;

  constructor(
     public db: AngularFireDatabase
  ) {
     this.state$ = new BehaviorSubject(null);
     this.selectedTasks$ = this.state$.switchMap(state =>
        db.list('tasks', ref =>
            state ? ref.orderByChild('state').equalTo(state) : ref
         ).snapshotChanges()
      );
   }

// Returns an Observable.
  getAllTasks() {
     return this.db.list('tasks').valueChanges();
  }

  filterBy(state: string|null) {
      this.state$.next(state);
   }

   expireTasks(){
      let now = Date.now();
      // I think below right now means 10 minutes ago??
      let cutoff = now - 10 * 1000;
      this.oldRef = this.db.list('tasks',
            ref => ref.orderByChild('created_at')
                      .endAt(cutoff)
      );
      console.log(this.oldRef);

      let oldTasks = [];
      let oldKeys = [];

      this.oldWithKeys = this.oldRef.snapshotChanges().map(changes => {
         return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(res =>
         oldTasks = res;
      );
      console.log(oldTasks);


      // oldTasks[0].forEach(function(task) {
      //    oldKeys.push(task['key']);
      //    console.log(oldKeys);
      // });

      console.log(oldKeys);

      // Observable.timer(0, 7000).flatMap((i) => )
   }


}
