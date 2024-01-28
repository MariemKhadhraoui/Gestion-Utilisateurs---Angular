

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit  {
  user: any = {};
  modificationReussie: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.loadUserData(userId);
    });
  }

  loadUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe((user: any) => {
      this.user = user;
    });
  }

  editUser(): void {
  
    this.userService.editUser(this.user.id, this.user).subscribe(() => {
          this.modificationReussie = true;
    });
  }
  cancelUpdate(): void {
    this.router.navigate(['/list-user']); 
  }
}
