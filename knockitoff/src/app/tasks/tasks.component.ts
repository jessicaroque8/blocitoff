import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../firebase.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

   tasks: Observable<any[]>;

  constructor(
     public fb: FirebaseService
   ) {
      this.tasks = fb.getTasks();
     }

  ngOnInit() {
  }

}
