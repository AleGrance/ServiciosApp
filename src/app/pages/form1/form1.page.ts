import { Component, OnInit, ViewChild  } from '@angular/core';
import { Location } from "@angular/common";
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.page.html',
  styleUrls: ['./form1.page.scss'],
})
export class Form1Page implements OnInit {
  @ViewChild(IonModal) modal: IonModal | any;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | any;

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
    const hora = ((<HTMLInputElement>document.getElementById("hora")).value);
    const nro_cel = ((<HTMLInputElement>document.getElementById("nro_cel")).value);
    const sanatorio = ((<HTMLInputElement>document.getElementById("sanatorio")).value);

    if (nombre === "" || fecha === "" || apellido === "") {
      let message = "Complete los campos!";
      let head = "ERR!";
      this.presentAlert(message, head);
      return
    }

    objTurno = {
      task_name: nombre + ' ' + apellido,
      task_details: 'Registrado',
      task_status: 'Confirmado',
      fecha_turno: fecha,
      hora_turno: hora,
      nro_cel: nro_cel,
      sanatorio: sanatorio,
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

  // Modal
  cancel() {
    this.modal.dismiss(null, 'cancel');
    console.log("se cancela");
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    console.log("se confirma el envio de los datos para pagar");
  }

  // onWillDismiss(event: Event) {
  //   const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   if (ev.detail.role === 'confirm') {
  //     this.message = `Hello, ${ev.detail.data}!`;
  //   }
  // }

}
