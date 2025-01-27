import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/Modelo/FileModel';
import { FilesService } from 'src/Servicios/Usuario/files.service';
import { UserService } from 'src/Servicios/Usuario/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-documentos',
  templateUrl: './mis-documentos.component.html',
  styleUrls: ['./mis-documentos.component.css']
})
export class MisDocumentosComponent implements OnInit {

  files: FileModel[] = [];

  constructor(private fileService: FilesService, private userService: UserService) { }

  ngOnInit() {
    this.getFiles();
  }

  getFiles(): void {
    this.fileService.getFiles().subscribe({
      next: (files: FileModel[]) => {
        this.files = files.filter(file => !file.isDeleted);
      },
      error: (err) => {
        console.error('Error al obtener archivos: ', err);
      }
    });

  }

  downloadFile(fileId: string): void {
    console.log('ID recibido para descargar:', fileId);
  
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
        link.download = file.fileName || 'file'; 
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
            this.getFiles();
          },
          error: (err) => {
            console.error('Error al eliminar el archivo', err);
            Swal.fire('Error', 'No se pudo eliminar el archivo.', 'error');
          }
        });
      }
    });
  }

  uploadFile(): void {
    Swal.fire({
      title: 'Subir archivo',
      input: 'file',
      inputAttributes: {
        accept: '*/*',
      },
      showCancelButton: true,
      confirmButtonText: 'Subir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const file = result.value as File; 
        const ownerId = this.userService.obtenerUsuarioID();
  
        if (!ownerId) {
          Swal.fire('Error', 'No se pudo obtener el OwnerID.', 'error');
          return;
        }
  
        this.fileService.uploadFile(file, '', ownerId).subscribe({
          next: () => {
            Swal.fire('Éxito', 'El archivo se ha subido correctamente.', 'success');
            this.getFiles();
          },
          error: (err) => {
            console.error('Error al subir el archivo:', err);
            Swal.fire('Error', 'No se pudo subir el archivo.', 'error');
          },
        });
      }
    });
  }

  shareFile(fileId: string): void {
    Swal.fire({
      title: 'Compartir archivo',
      input: 'email',
      inputLabel: 'Correo electrónico del usuario',
      inputPlaceholder: 'Ingresa el correo del usuario',
      showCancelButton: true,
      confirmButtonText: 'Compartir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const email = result.value;
  
        this.fileService.shareFile(fileId, email).subscribe({
          next: (response) => {
            console.log('Archivo compartido exitosamente:', response);
            Swal.fire('Éxito', 'El archivo se ha compartido correctamente', 'success');
          },
          error: (error) => {
            console.error('Error al compartir el archivo:', error);
            Swal.fire('Error', 'Hubo un problema al compartir el archivo', 'error');
          }
        });
        
      }
    });
  }
  
}
