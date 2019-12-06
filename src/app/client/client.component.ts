import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { Client } from './model/client';

const ELEMENT_DATA: Client[] = [
  {id: 1, name: 'Éber Moreira', cpf: '052.871.771-51', email: 'eber@unb.br', phone: '(61) 3107-0023'}
];

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'cpf', 'phone', 'email', 'action'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {

  }

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Adicionar') {
        this.addRowData(result.data);
      } else if (result.event === 'Atualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Excluir') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj) {
    // Call to service
    console.log(rowObj);
    this.dataSource.push({
      id: this.dataSource[this.dataSource.length - 1].id + 1,
      name: rowObj.name,
      cpf: rowObj.cpf,
      phone: rowObj.phone,
      email: rowObj.email
    });
    this.table.renderRows();

  }

  updateRowData(rowObj) {
    // Call to service
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === rowObj.id) {
        value.name = rowObj.name;
        value.cpf = rowObj.cpf;
        value.phone = rowObj.phone;
        value.email = rowObj.email;
      }
      return true;
    });
  }

  deleteRowData(rowObj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== rowObj.id;
    });
  }

}
