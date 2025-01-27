import { Component, OnInit } from '@angular/core';
import { SharedFile } from 'src/Modelo/SharedFile';
import { SharedFilesService } from 'src/Servicios/shareFiles.service';
import { FilesService } from 'src/Servicios/Usuario/files.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compartido-conmigo',
  templateUrl: './compartido-conmigo.component.html',
  styleUrls: ['./compartido-conmigo.component.css']
})
export class CompartidoConmigoComponent implements OnInit {


  sharedFiles: SharedFile[] = [];

  constructor(private shareFilesService: SharedFilesService, private fileService: FilesService) { }

  ngOnInit() {
    this.getSharedfiles();
  }

  getSharedfiles(): void {
    this.shareFilesService.getSharedFiles().subscribe({
      next: (sharedFiles: SharedFile[]) => {
        this.sharedFiles = sharedFiles;
      },
      error: (err) => {
        console.error('Error al obtener sharedFiles', err);
      }
    });
  }

  downloadFile(fileId: string): void {
    console.log('ID recibido para descargar:', fileId);
  
    const file = this.sharedFiles.find(f => f.FileID === fileId);
    
    if (!file) {
      console.error('Archivo no encontrado para el ID:', fileId);
      return;
    }
  
    this.fileService.downloadFile(fileId).subscribe({
      next: (fileBlob: Blob) => {
        const url = window.URL.createObjectURL(fileBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.FileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el archivo', err);
      }
    });
  }

  revokeAccess(userFileId: number): void {
    const fileIndex = this.sharedFiles.findIndex(f => f.UserFileID === userFileId);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se revocará el acceso a este archivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, revocar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.shareFilesService.revokeAccess(userFileId).subscribe({
          next: (response) => {
            console.log('Acceso revocado exitosamente:', response);
            this.sharedFiles.splice(fileIndex, 1);
            Swal.fire('Éxito', 'El acceso ha sido revocado.', 'success');
            this.getSharedfiles();
          },
          error: (error) => {
            console.error('Error al revocar el acceso:', error);
            Swal.fire('Error', 'No se pudo revocar el acceso.', 'error');
          },
        });
      }
    });
  }
  
}
