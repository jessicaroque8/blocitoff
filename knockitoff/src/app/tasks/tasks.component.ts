import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../firebase.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

   title = 'Active Tasks';
   selectedState = 'active';
   selectedTasks: Observable<any[]>;

  constructor(
     public fb: FirebaseService
   ) {}

   onSelect(state) {
      if (state == 'history') {
         this.title = 'Task History';
         this.selectedState = 'history';
         this.fb.filterBy('complete');
      } else {
         this.title = 'Active Tasks';
         this.selectedState = 'active';
         this.fb.filterBy('active');
      }
   }

  ngOnInit() {
     this.fb.filterBy('active');
     this.selectedTasks = this.fb.selectedTasks$;
     this.fb.expireTasks();
  }

}
