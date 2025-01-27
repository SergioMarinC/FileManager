import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileModel } from 'src/Modelo/FileModel';

@Component({
  selector: 'app-basura',
  templateUrl: './basura.component.html',
  styleUrls: ['./basura.component.css']
})
export class BasuraComponent implements OnInit {

  @Input() file!: FileModel;
  @Output() idFileRestore = new EventEmitter<string>();
  @Output() idFileDelete = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log('Archivo recibido en DocumentoComponent:', this.file);
  }

  restore(): void{
    console.log('ID del archivo:', this.file?.fileId); // Verifica si `fileId` es accesible
    if (this.file) {
      this.idFileRestore.emit(this.file.fileId); // Emite el ID
    } else {
      console.error('No se encuentra el archivo para eliminar');
    }
  }

  delete(): void {
    console.log('ID del archivo:', this.file?.fileId); // Verifica si `fileId` es accesible
    if (this.file) {
      this.idFileDelete.emit(this.file.fileId); // Emite el ID
    } else {
      console.error('No se encuentra el archivo para eliminar');
    }
  }
}
