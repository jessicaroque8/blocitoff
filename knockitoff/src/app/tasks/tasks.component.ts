import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../firebase.service'
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';



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
     this.fb.expireTasks();
     this.selectedTasks = this.fb.selectedTasks$;
     this.fb.filterBy('active');
  }

}
