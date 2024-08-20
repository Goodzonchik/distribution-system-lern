import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersTableComponent } from './users/users-table/users-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
