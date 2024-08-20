import { Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-table',
  standalone: true,
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  providers: [UsersApiService],
})
export class UsersTableComponent {
  private usersApiService = inject(UsersApiService);

  users = toSignal(this.usersApiService.getUsers$());

  createRelationShip() {
    this.usersApiService
      .setUsersRelationship$('Kevin', 'Joli', 'PARENT')
      .subscribe();
  }
}
