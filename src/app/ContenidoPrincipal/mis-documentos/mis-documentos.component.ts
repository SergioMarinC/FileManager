import { Component, OnInit } from '@angular/core';
import { File } from 'src/Modelo/File';
import { FilesService } from 'src/Servicios/Usuario/files.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-documentos',
  templateUrl: './mis-documentos.component.html',
  styleUrls: ['./mis-documentos.component.css']
})
export class MisDocumentosComponent implements OnInit {

  files: File[] = [];

  constructor(private fileService: FilesService) { }

  ngOnInit() {
    this.getFiles();
  }

  getFiles(): void {
    this.fileService.getFiles().subscribe({
      next: (files: File[]) => {
        this.files = files.filter(file => !file.isDeleted);
      },
      error: (err) => {
        console.error('Error al obtener archivos: ', err);
      }
    });

  }

  downloadFile(fileId: string): void {
    console.log('ID recibido para descargar:', fileId); // Verifica el ID recibido
  
    // Usamos el getter para buscar en la lista de archivos
    const file = this.files.find(f => f.fileId === fileId);
    if (!file) {
      console.error('Archivo no encontrado para el ID:', fileId);
      return;
    }
  
    this.fileService.downloadFile(fileId).subscribe({
      next: (fileBlob: Blob) => {
        const url = window.URL.createObjectURL(fileBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.fileName || 'file'; // Usa el getter para fileName
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el archivo', err);
      }
    });
  }

  recycleFile(fileId: string): void {
    console.log('ID recibido para eliminar:', fileId);
  
    const fileIndex = this.files.findIndex(f => f.fileId === fileId);
    if (fileIndex === -1) {
      console.error('Archivo no encontrado para el ID:', fileId);
      return;
    }

    // Mostrar diálogo de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este archivo será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileService.recycle(fileId).subscribe({
          next: (message: string) => {
            this.files.splice(fileIndex, 1);
            Swal.fire('Eliminado', 'El archivo ha sido eliminado.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar el archivo', err);
            Swal.fire('Error', 'No se pudo eliminar el archivo.', 'error');
          }
        });
      }
    });
  }
}
