import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class animalComponent {

  animalList: any = [];

  user = "Prueba";

  editableAnimal: Boolean = false;
  idAnimal: string = "";

  animalForm: any = this.formBuilder.group({
    nombre: "",
    edad: 0,
    tipo: "",
    fecha: Date,
    codigo: 0
  })

  ngOnInit() {
    this.user = GlobalComponent.user;
    this.getAllAnimals();
  }

  //Consultar aniamles
  getAllAnimals() {
    this.animalService.newAnimal(this.animalForm.value).subscribe((data: {}) => {
      this.animalList = data;
      console.log(this.animalList)
    });
  }

  //Creando un animal
  newAnimalEntry() {
    this.animalService.newAnimal(this.animalForm.value).subscribe(() => {
      this.router.navigate(["/animal"]).then(() => {
        this.newMessage("Registro exitoso");
      })
    })
  }

  //Mostrar mensaje ToastR

  newMessage(messageText: string) {
    this.toastr.success("Clic aquí para actualizar la lista", messageText).onTap.pipe(take(1)).subscribe(() => window.location.reload());
  }

  updateAnimalEntry() {
    for (let key in this.animalForm.value) {
      if (this.animalForm.value[key] === "" || this.animalForm.value[key] == null) {
        this.animalForm.removeControl(key);
      }
    }
    this.animalService.updateAnimal(this.idAnimal, this.animalForm.value).subscribe(() => {
      this.newMessage("animal Editado");
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
    return finalDate;
  }

  toggleEditAnimal(id: string) {
    this.idAnimal = id;
    console.log(id);
    this.animalService.getOneAnimal(id).subscribe((data) => {
      this.animalForm.setValue({
        nombre: data.nombre,
        edad: data.edad,
        tipo: data.tipo,
        fecha: this.getValidDate(data.fecha),
        codigo: data.codigo
      })
    });

    this.editableAnimal = !this.editableAnimal;
  }

  deleteAnimalEntry(id: string) {
    this.animalService.deleteOneAnimal(id).subscribe(() => {
      this.newMessage("animal Eliminado")
    })
  }

  constructor(private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {

  }

}
