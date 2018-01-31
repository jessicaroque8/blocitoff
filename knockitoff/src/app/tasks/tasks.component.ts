import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

   items: Observable<any[]>;

  constructor(
     db: AngularFireDatabase
   ) {
      this.items = db.list('items').valueChanges();
     }

  ngOnInit() {
  }

}
