import { Component, OnInit } from '@angular/core';
import { File } from 'src/Modelo/File';
import { FilesService } from 'src/Servicios/Usuario/files.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent implements OnInit {

  files: File[] = [];

  constructor(private fileService: FilesService) { }

  ngOnInit() {
    this.getFiles();
  }

  getFiles(): void {
    this.fileService.getFiles().subscribe({
      next: (files: File[]) => {
        this.files = files.filter(file => file.isDeleted);
      },
      error: (err) => {
        console.error('Error al obtener archivos: ', err);
      }
    });
  }

  restoreFile(fileId: string): void {
      console.log('ID recibido para restaurar:', fileId);
    
      const fileIndex = this.files.findIndex(f => f.fileId === fileId);
      if (fileIndex === -1) {
        console.error('Archivo no encontrado para el ID:', fileId);
        return;
      }
  
      // Mostrar diálogo de confirmación
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Este archivo será retaurado',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, restaurarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.fileService.restore(fileId).subscribe({
            next: (message: string) => {
              this.files.splice(fileIndex, 1);
              Swal.fire('Eliminado', 'El archivo ha sido restaurado.', 'success');
            },
            error: (err) => {
              console.error('Error al restaurar el archivo', err);
              Swal.fire('Error', 'No se pudo restaurar el archivo.', 'error');
            }
          });
        }
      });
    }

    deleteFile(fileId: string): void {
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
            this.fileService.delete(fileId).subscribe({
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
