import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersApiService } from './users-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [UsersApiService],
})
export class AppComponent {
  private usersApiService = inject(UsersApiService);

  users = toSignal(this.usersApiService.getUsers$());
}
