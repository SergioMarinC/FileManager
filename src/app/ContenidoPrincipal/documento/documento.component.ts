import { Component, EventEmitter, Input, Output } from '@angular/core';
import { File } from 'src/Modelo/File';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent {
  @Input() file!: File;
  @Output() idFileDownload = new EventEmitter<string>();
  @Output() idFileRecycle = new EventEmitter<string>();

  ngOnInit() {
    console.log('Archivo recibido en DocumentoComponent:', this.file); // Verifica si se recibe el archivo
  }

  download(): void {
    console.log('ID del archivo:', this.file?.fileId); // Verifica si `fileId` es accesible
    if (this.file) {
      this. idFileDownload.emit(this.file.fileId); // Emite el ID
    } else {
      console.error('No se encuentra el archivo para descargar');
    }
  }

  recycle(): void {
    console.log('ID del archivo:', this.file?.fileId); // Verifica si `fileId` es accesible
    if (this.file) {
      this.idFileRecycle.emit(this.file.fileId); // Emite el ID
    } else {
      console.error('No se encuentra el archivo para eliminar');
    }
  }
}
