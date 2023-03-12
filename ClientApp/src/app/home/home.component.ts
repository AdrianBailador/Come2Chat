import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void{
    this.initialzeForm();
  }

  initialzeForm(): void {
    this.userForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]]
    })
  }

  submitForm(){
    this.submitted = true;

    if(this.userForm.valid){
      console.log(this.userForm.value);
    }
  }

}
