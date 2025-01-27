import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedFile } from 'src/Modelo/SharedFile';

@Component({
  selector: 'app-documento-compartido',
  templateUrl: './documento-compartido.component.html',
  styleUrls: ['./documento-compartido.component.css']
})
export class DocumentoCompartidoComponent implements OnInit {


  @Input() sharedFile!: SharedFile;
  @Output() idFileDownload = new EventEmitter<string>();
  @Output() idFileDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    console.log('Archivo recibido en DocumentoComponent:', this.sharedFile);
  }

  download(): void {
    console.log('ID del archivo:', this.sharedFile?.FileID); // Verifica si `fileId` es accesible
    if (this.sharedFile) {
      this.idFileDownload.emit(this.sharedFile.FileID); // Emite el ID
    } else {
      console.error('No se encuentra el archivo para descargar');
    }
  }

  delete(): void {
    console.log('ID del archivo:', this.sharedFile?.FileID); // Verifica si `fileId` es accesible
    if (this.sharedFile) {
      this.idFileDelete.emit(this.sharedFile.UserFileID); // Emite el ID
    } else {
      console.error('No se encuentra el archivo para eliminar');
    }
  }
}
