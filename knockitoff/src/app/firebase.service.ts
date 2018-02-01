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
  ref() {
     return this.db.list('tasks')
  }

  filterBy(state: string|null) {
      this.state$.next(state);
   }

   expireTasks(){
      let now = Date.now();

      // I think below right now means 10 minutes ago??
      let cutoff = now - 10 * 1000;
      const oldRef = this.db.list('tasks',
            ref => ref.orderByChild('created_at')
                      .endAt(cutoff)
      );

      // Update old tasks in the database with status: complete.
      const oldWithKeys = oldRef.snapshotChanges().map(changes => {
         return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }).subscribe(res => {
            let oldTasks = [];
            let oldKeys = [];

            oldTasks.push(res);
            oldTasks[0].forEach(function(task){
               oldKeys.push(task['key']);
            });

            for (let i = 0; i < oldKeys.length; i++) {
               this.db.object('/tasks/' + oldKeys[i]).update(({state: 'complete'}))
            }
         });
   }

}
