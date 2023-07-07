import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userList: any = [];

  user = "Prueba";

  editableUser: Boolean = false;
  idUser: string = "";

  userForm: any = this.formBuilder.group({
    usuario: "",
    correo: "",
    clave: "",
    cc: 0,
    nombre: "",
    vhur: 0,
    telefono: 0,
    sexo: "",
    fecha_vinculacion: Date,
    rol: 0
  })

  ngOnInit() {
    this.user = GlobalComponent.user;
    console.log(GlobalComponent.rol)
    if (GlobalComponent.rol != 3) {
      this.router.navigate(["/welcome"])
    }
    this.getAllUsers();
  }

  //Consultar usuarios
  getAllUsers() {
    this.userService.getAllUsersData().subscribe((data: {}) => {
      this.userList = data;
      console.log(this.userList)
    });
  }

  //Creando un user
  newUserEntry() {
    this.userService.newUser(this.userForm.value).subscribe(() => {
      this.router.navigate(["/user"]).then(() => {
        this.newMessage("Registro exitoso");
      })
    })
  }

  //Mostrar mensaje ToastR

  newMessage(messageText: string) {
    this.toastr.success("Clic aquí para actualizar la lista", messageText).onTap.pipe(take(1)).subscribe(() => window.location.reload());
  }

  updateUserEntry() {
    for (let key in this.userForm.value) {
      if (this.userForm.value[key] === "" || this.userForm.value[key] == null) {
        this.userForm.removeControl(key);
      }
    }
    this.userService.updateUser(this.idUser, this.userForm.value).subscribe(() => {
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

  toggleEditUser(id: string) {
    this.idUser = id;
    console.log(id);
    this.userService.getOneUser(id).subscribe((data) => {
      this.userForm.setValue({
        usuario: data.usuario,
        correo: data.correo,
        clave: data.clave,
        cc: data.cc,
        nombre: data.nombre,
        vhur: data.vhur,
        telefono: data.telefono,
        sexo: data.sexo,
        fecha_vinculacion: this.getValidDate(data.fecha_vinculacion),
        rol: data.rol
      })
    });

    this.editableUser = !this.editableUser;
  }

  deleteUserEntry(id: string) {
    this.userService.deleteOneUser(id).subscribe(() => {
      this.newMessage("user Eliminado")
    })
  }

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {

  }

}
