import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class FirebaseService {

  selectedTasks$: Observable<any[]>;
  status$: BehaviorSubject<string|null>;

  constructor(
     public db: AngularFireDatabase
  ) {
     this.status$ = new BehaviorSubject(null);
     this.selectedTasks$ = this.status$.switchMap(status =>
        db.list('tasks', ref =>
            status ? ref.orderByChild('status').equalTo(status) : ref
         ).snapshotChanges()
      );
   }

// Returns an Observable.
  ref() {
     return this.db.list('tasks')
  }

  filterBy(status: string|null) {
      this.status$.next(status);
   }

   expireTasks(){
      let now = Date.now();
      let cutoff = now - 7 * 24 * 60 * 60 * 1000;

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

   addTask(title, priority) {
      let datetime = Date.now();
      this.db.list('tasks').push(
            { priority: priority,
              title: title,
              status: 'active',
              created_at: datetime
             },
      );
   }

}
