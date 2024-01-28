// add-user.component.ts

import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: any = {};
  ajoutReussi: boolean = false;
  fieldsAreValid: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  addUser() {
    if (this.validateFields()) {
      this.user.id = uuidv4();
      this.userService.addUser(this.user).subscribe(() => {
        this.ajoutReussi = true;
        setTimeout(() => {
          this.ajoutReussi = false;
          this.router.navigate(['/list-user']); 
        }, 5000); 
      });
    } else {
      this.fieldsAreValid = false;  
    }
  }

  // Fonction pour valider les champs
  validateFields(): boolean {
    return !!this.user.name && !!this.user.username && !!this.user.email &&
           !!this.user.address && !!this.user.phone && !!this.user.company;
  }


  cancelAdd(): void {
    this.router.navigate(['/list-user']); 
  }
}
