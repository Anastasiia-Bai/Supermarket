import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { DialogWelcomeComponent } from '../dialog-welcome/dialog-welcome.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public step: boolean = false;
  public signUpForm: FormGroup;
  public cities = ["Jerusalem", "Tel Aviv", "Haifa", "Rishon Lezion", "Petah Tikva", "Ashdod", "Rehovot", "Ashkelon", "Kfar Saba", "Karmiel", "Ramat Gan"];
  public city: string = "";
  public notification1 = "";
  public notification2 = "";

  constructor(public usersService: UsersService, public fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userId: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      city: ["", Validators.required],
      street: ["", Validators.required]
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogWelcomeComponent, {
      width: '40%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(
      res => {
        console.log('Dialog result is: ' + res);
      },
      err => console.log(err)
    );
  }

  public nextStep(): void {
    if (this.signUpForm.value.userId && this.signUpForm.value.email
      && this.signUpForm.value.password && this.signUpForm.value.passwordConfirm) {
      if (this.signUpForm.value.userId.length == 9) {
        if (this.signUpForm.controls.email.valid) {
          if (this.signUpForm.value.password == this.signUpForm.value.passwordConfirm) {
            this.step = true;
          } else {
            console.log("The passwords don't match");
            this.notification1 = "The passwords don't match";
          }
        } else {
          console.log("The email is wrong");
          this.notification1 = "The email is wrong";
        }
      } else {
        console.log("ID length must be 9");
        this.notification1 = "ID length must be 9";
      }
    } else {
      console.log("You have to fill all the blanks");
      this.notification1 = "You have to fill all the blanks";
    };
  };

  public signInSubmit() {
    if (this.signUpForm.value.firstName && this.signUpForm.value.lastName
      && this.signUpForm.value.city && this.signUpForm.value.street) {

      const observable = this.usersService.register(this.signUpForm.value);
      observable.subscribe((successfullServerRequestData: any) => {
        console.log(successfullServerRequestData);
        this.openDialog();
        this.notification2 = "";
      }, serverErrorResponse => {
        alert("Error 13!" + serverErrorResponse);
      });
    } else {
      this.notification2 = "You have to fill all the blanks";
    };
  }

  public backStep(): void {
    this.step = false;
    this.notification1 = ""
  };

  public signUpCancel() {
    this.usersService.signUp = false;
  };
}