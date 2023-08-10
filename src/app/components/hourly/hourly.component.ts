import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']

})
export class HourlyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }
}
