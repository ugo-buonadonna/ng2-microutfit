import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {
  sku: AbstractControl;

  myForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku': ['',Validators.required]
    })
    this.sku = this.myForm.controls['sku'];

  }

  /*
  onSubmit(form: any): void {
    console.log('you submitted value:', form);
  }
  */
  onSubmit(value: string): void {
    console.log('you submitted value:', value);
  }
  ngOnInit() {

  }

}
