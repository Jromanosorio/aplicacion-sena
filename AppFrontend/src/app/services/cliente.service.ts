import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  selectedClient: Cliente;
  clientList: Cliente[];
  readonly API_URL = 'http://localhost:8081/api/clients';

  constructor(private http: HttpClient) {
    this.selectedClient = new Cliente();
    this.clientList = []
  }

  getClients() {
    return this.http.get(this.API_URL);
  }

  postClient(client: Cliente){
    return this.http.post(this.API_URL, client);
  }

  patchClient(_id: Number, client: Cliente){
    return this.http.patch(this.API_URL + `/${_id}`, client);
  }

  deleteClient(_id: Number){
    return this.http.delete(this.API_URL + `/${_id}`);
  }
}
