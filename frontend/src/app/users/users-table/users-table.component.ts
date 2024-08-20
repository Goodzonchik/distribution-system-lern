import { Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-table',
  standalone: true,
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  providers: [UsersApiService],
  imports: [AsyncPipe, ReactiveFormsModule],
})
export class UsersTableComponent {
  private usersApiService = inject(UsersApiService);

  users$ = this.loadData$();

  name = new FormControl('', Validators.required);

  loadData$() {
    return this.usersApiService.getUsers$();
  }

  createRelationShip() {
    this.usersApiService
      .setUsersRelationship$('Kevin', 'Joli', 'PARENT')
      .subscribe();
  }

  createUser() {
    if (this.name.value) {
      this.usersApiService
        .createUsers$('Person', 'name', this.name.value)
        .subscribe(() => {
          this.name.reset();
          this.users$ = this.loadData$();
        });
    }
  }
}
