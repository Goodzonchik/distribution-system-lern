import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FileDto, FilesApiService } from '../../shared/files-api.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-files-table',
  standalone: true,
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.scss',
  providers: [FilesApiService],
  imports: [AsyncPipe, DatePipe, ReactiveFormsModule],
})
export class FilesTableComponent {
  private filesApiService = inject(FilesApiService);

  files$: Observable<FileDto[]> = this.loadData$();

  name = new FormControl('', Validators.required);
  label = new FormControl('', Validators.required);

  parent: string | null = null;
  child: string | null = null;

  fileToUpload: File | null = null;

  loadData$() {
    return this.filesApiService.getFiles$('frankenstein');
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
