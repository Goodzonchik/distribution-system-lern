import { Component, inject } from '@angular/core';
import { UsersApiService } from '../users-api.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { FilesApiService } from '../../shared/files-api.service';

@Component({
  selector: 'app-users-table',
  standalone: true,
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  providers: [UsersApiService, FilesApiService],
  imports: [AsyncPipe, ReactiveFormsModule],
})
export class UsersTableComponent {
  private usersApiService = inject(UsersApiService);
  private filesApiService = inject(FilesApiService);

  users$ = this.loadData$();

  name = new FormControl('', Validators.required);
  label = new FormControl('', Validators.required);

  parent: string | null = null;
  child: string | null = null;

  fileToUpload: File | null = null;

  loadData$() {
    return this.usersApiService.getUsers$();
  }

  createRelationShip() {
    if (!this.parent || !this.child) {
      alert('Choose parent and child!');

      return;
    }

    this.usersApiService
      .setUsersRelationship$(this.parent, this.child, 'PARENT')
      .subscribe(() => {
        this.parent = null;
        this.child = null;
      });
  }

  setParent(user: string) {
    this.parent = user;
  }

  setChild(user: string) {
    this.child = user;
  }

  createUser() {
    if (this.name.value && this.label.value) {
      this.usersApiService
        .createUsers$('Person', 'name', this.name.value, this.label.value)
        .subscribe(() => {
          this.name.reset();
          this.users$ = this.loadData$();
        });
    }
  }

  deleteUser(user: string) {
    this.usersApiService.deleteUser$(user).subscribe(() => {
      this.name.reset();
      this.users$ = this.loadData$();
    });
  }

  downloadFile() {
    this.filesApiService.getFile$('tabaxi.jpg').subscribe(() => {});
  }

  handleFileInput(event: Event | null) {
    const files = (event as any)?.target?.files;
    if (!files) {
      return;
    }

    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    if (!this.fileToUpload) {
      return;
    }

    this.filesApiService.postFile(this.fileToUpload).subscribe();
  }
}
