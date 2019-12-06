import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Client } from '../model/client';
import { genericValidator } from '../util/generic-validator.directive';
import { CPFValidator } from '../util/cpf-validator';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action: string;
  localData: any;
  client: FormGroup;

  phoneMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Client,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {

    this.action = this.data.action; // Plus property to define action

    this.client = this.formBuilder.group({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(50)]),
      cpf: new FormControl(this.data.cpf, [Validators.required, genericValidator(/\d\d\d\.\d\d\d\.\d\d\d\-\d\d/), CPFValidator.isValidCpf()]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data.phone, [Validators.required, genericValidator(/\(\d\d\)\d\d\d\d\d\-\d\d\d\d/)])
    });
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.client.value});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  get name() {
    return this.client.get('name') as FormControl;
  }

  get email() {
    return this.client.get('email') as FormControl;
  }

  get phone() {
    return this.client.get('phone') as FormControl;
  }

  get cpf() {
    return this.client.get('cpf') as FormControl;
  }

  getMsgRequired() {
    return 'Campo obrigatório';
  }

  getMsgCPFInvalid() {
    return 'CPF Inválido';
  }

  getMsgEmailInvalid() {
    return 'E-mail Inválido';
  }

  compareWithFn(item1, item2) {
    return item1 && item2 ? item1.name === item2.name : item1 === item2;
  }
}
