import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileModel } from 'src/Modelo/FileModel';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent {
  @Input() file!: FileModel;
  @Output() idFileDownload = new EventEmitter<string>();
  @Output() idFileRecycle = new EventEmitter<string>();
  @Output() idFileShare = new EventEmitter<string>();

  ngOnInit() {
    console.log('Archivo recibido en DocumentoComponent:', this.file);
  }

  download(): void {
    console.log('ID del archivo:', this.file?.fileId);
    if (this.file) {
      this.idFileDownload.emit(this.file.fileId);
    } else {
      console.error('No se encuentra el archivo para descargar');
    }
  }

  recycle(): void {
    console.log('ID del archivo:', this.file?.fileId);
    if (this.file) {
      this.idFileRecycle.emit(this.file.fileId);
    } else {
      console.error('No se encuentra el archivo para eliminar');
    }
  }

  share(): void {
    console.log('ID del archivo:', this.file?.fileId);
    if (this.file) {
      this.idFileShare.emit(this.file.fileId);
    } else {
      console.error('No se encuentra el archivo para eliminar');
    }
  }
  
}
