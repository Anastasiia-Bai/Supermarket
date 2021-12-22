import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dialog-welcome',
  templateUrl: './dialog-welcome.component.html',
  styleUrls: ['./dialog-welcome.component.css']
})
export class DialogWelcomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  public loginAfterRegister() {
    this.router.navigate([""]);
  }
}
