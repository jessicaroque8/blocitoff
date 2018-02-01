import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../firebase.service'
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

   title = 'Active Tasks';
   selectedState = 'active';
   selectedTasks: Observable<any[]>;
   newTask = {
      title: '',
      priority: 0,
   }

   public priorities = [
      {value: 0, viewValue: 'low'},
      {value: 1, viewValue: 'medium'},
      {value: 2, viewValue: 'high'}
   ]


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

   addRefresh() {
      let title = this.newTask.title;
      let priority = this.newTask.priority;
      this.fb.addTask(title, priority);
      this.onSelect('active');
   }

  ngOnInit() {
     this.fb.expireTasks();
     this.selectedTasks = this.fb.selectedTasks$;
     this.fb.filterBy('active');
  }

}
