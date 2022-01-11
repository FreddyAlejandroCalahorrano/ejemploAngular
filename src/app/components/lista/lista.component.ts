import { ConexionService } from './../../services/conexion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  items: any;
  editarItem: any = {
    nlista: '',
    id:''
  }

  constructor(private conexion:ConexionService) { 
      this.conexion.nListaItem().subscribe(item => {
      this.items = item;
    })
  }

  ngOnInit(): void {
  }
  eliminar(item: any){
    this.conexion.eliminarItem(item);
  }
  editar(item: any){
    this.editarItem = item; 
  }
  agregarItemEdi(){
    this.conexion.editarItem(this.editarItem)
    console.log(this.editarItem)
  }
}
