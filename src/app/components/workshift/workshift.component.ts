import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { WorkshiftService } from 'src/app/services/workshift.service';

@Component({
  selector: 'app-workshift',
  templateUrl: './workshift.component.html',
  styleUrls: ['./workshift.component.css']
})
export class WorkshiftComponent {

  workshiftList: any = [];

  user = "Prueba"

  editableWorkshift: Boolean = false;

  idWorkshift: string = "";

  workshiftForm: any = this.formBuilder.group({
    hora_inicio: Date,
    hora_fin: Date,
    agente: "",
  })

  ngOnInit(): void {
    this.user = GlobalComponent.user;
    console.log(GlobalComponent.rol)
    if (GlobalComponent.rol != 3) {
      this.router.navigate(["/welcome"])
    }
    this.getAllWorkshifts();
  }

  //Consultar turnos
  getAllWorkshifts() {
    this.workshiftService.getAllWorkshiftsData().subscribe((data: {}) => {
      this.workshiftList = data;
      console.log(this.workshiftList)
    });
  }

  //Creando un turno
  newWorkshiftEntry() {

    console.log(this.getValidDate(this.workshiftForm.value["hora_inicio"]))

    this.workshiftService.newWorkshift(this.workshiftForm.value).subscribe(() => {
      this.router.navigate(["/workshift"]).then(() => {
        this.newMessage("Registro exitoso");
      })
    })
  }

  //Mostrar mensaje ToastR

  newMessage(messageText: string) {
    this.toastr.success("Clic aquí para actualizar la lista", messageText).onTap.pipe(take(1)).subscribe(() => window.location.reload());
  }

  //Actualiza Turno
  updateWorkshiftEntry() {
    for (let key in this.workshiftForm.value) {
      if (this.workshiftForm.value[key] === "" || this.workshiftForm.value[key] == null) {
        this.workshiftForm.removeControl(key);
      }
    }
    this.workshiftService.updateWorkshift(this.idWorkshift, this.workshiftForm.value).subscribe(() => {
      this.newMessage("Usuario Editado");
    })
  }

  //Convertir tipo Date
  getValidDate(fecha: Date) {

    const fechaFinal: Date = new Date(fecha);

    //Separado los datos
    var dd = fechaFinal.getDate() + 1;//fue necesario porque siempre daba un día antes
    var mm = fechaFinal.getMonth() + 1; //porque Enero es 0
    var yyyy = fechaFinal.getFullYear();
    var mes = '';
    var dia = '';
    var h = fechaFinal.getHours();

    //Como algunos meses tienen 31 días dd puede dar 32
    if (dd == 32) {
      dd = 1;
      mm++;
    }

    //Transformación de fecha cuando el día o mes son menores a 10
    //se le coloca un cero al inicio
    //Día

    if (dd < 10) {
      dia += `0${dd}`;
    } else {
      dia += `${dd}`;
    }

    //Mes
    if (mm < 10) {
      mes += `0${mm}`;
    } else {
      mes += `${mm}`;
    }

    //formatDate para colocar la fecha en un formato aceptado por el calendario
    //GMT-0500 es para Colombia
    var finalDate = formatDate(new Date(yyyy + '-' + mes + '-' + dia + ' GMT-0500'), 'yyyy-MM-dd', "en-US");
    console.log(h)
    return finalDate;
  }

  deleteWorkshiftEntry(id: string) {
    this.workshiftService.deleteOneWorkshift(id).subscribe(() => {
      this.newMessage("user Eliminado")
    })
  }

  constructor(private workshiftService: WorkshiftService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {

  }

}
