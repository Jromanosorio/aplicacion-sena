import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent implements OnInit {
  show: boolean = true;

  constructor(public clientService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clientService.getClients().subscribe(
      (res) => {
        this.clientService.clientList = res as Cliente[];
        console.log('Obtencion de clientes exitosa')
      },
    (error) => {
      console.error(error)
    })
  }

  crearCliente(form?: NgForm){
    this.clientService.postClient(form?.value).subscribe((res) => {
      this.resetForm(form);
      M.toast({html: 'Guardado Exitoso'})
      this.obtenerClientes()
    }, (error) => {
      M.toast({html: error.error.message})
    })
  }

  enviarFormulario(client: Cliente, form?: NgForm): void {
    form?.control.patchValue(
      client
    )

    this.mostrarBoton()
    console.log(form?.value);
  }

  actualizarCliente(form?: NgForm){
    this.clientService.patchClient(form?.value._id, form?.value).subscribe((res) => {
      M.toast({html: 'Se ha actualizado correctamente'})
      this.mostrarBoton()
      this.obtenerClientes()
    }, (error) => {
      M.toast({html: 'Ha ocurrido un error al actualizar el cliente'})
      
      this.obtenerClientes()
    })

    this.resetForm(form)
  }

  eliminarCliente(client: Cliente){
    if(confirm('Estas seguro de eliminar al cliente')){
      console.log(client._id)
      this.clientService.deleteClient(client._id).subscribe((res) => {
        this.obtenerClientes()
        M.toast({html: 'Se ha eliminado correctamente'})
      })
    }
  }


  resetForm(form?: NgForm){
    if (form) {
      form.reset()
      this.clientService.selectedClient = new Cliente();
    }
  }

  mostrarBoton() {
    this.show = !this.show;
  }
}
