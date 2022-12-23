import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.page.html',
  styleUrls: ['./form1.page.scss'],
})
export class Form1Page implements OnInit {

  constructor(private location: Location, public api: ApiService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async presentAlert(message: any, head: any) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: message,
      message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  enviar() {
    let objTurno: any;
    const nombre = ((<HTMLInputElement>document.getElementById("nombre")).value);
    const apellido = ((<HTMLInputElement>document.getElementById("apellido")).value);
    const fecha = ((<HTMLInputElement>document.getElementById("fecha")).value);

    if (nombre === "" || fecha === "" || apellido === "") {
      let message = "Complete los campos!";
      let head = "ERR!";
      this.presentAlert(message, head);
      return
    }

    objTurno = {
      task_name: nombre + ' ' + apellido,
      task_details: fecha,
      task_status: 'Confirmado',
      UserUserId: 1
    }


    console.log('lo que se envia: ', objTurno)

    this.api.post('tasks', objTurno)
      .subscribe(result => {
        // Se actualiza la vista html si el result retorna un objeto, significa que inserto en la bd. De lo contrario muestra el mensaje de error que retorna el server
        if (typeof result === 'object') {
          //this.toastr.success('Cliente registrado');
          // Llama a la funcion onInit que agrega a la lista el cliente registrado
          console.log('result post: ', result);
          let message = "Turno registrado con exito!";
          let head = "OK!";
          this.presentAlert(message, head);
          this.goHome();
          // Funcion para resetear el formulario
          //this.clienteForm.reset();
        } else {
          console.log('result post: ', result);
          //this.toastr.warning(result);
        }
      }, error => {
        console.log('Si hay error en el post: ', error);
      });
  }


  goHome() {
    this.router.navigate(['home']);
  }

}
