import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';
  selectedUser: any;
  showUserDetailsModal: boolean = false;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
      console.log("la liste est la suivante : ", users);
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  get pagedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }

  searchUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1; // Retour à la première page après la recherche
  }

  resetSearch(): void {
    this.searchText = '';
    this.filteredUsers = this.users;
    this.currentPage = 1; // Retour à la première page après la réinitialisation
  }

  
  viewUserDetails(user: any): void {
    this.selectedUser = user;
    this.showUserDetailsModal = true;
  }
  closeUserDetailsModal(): void {
    this.showUserDetailsModal = false;
  }




  deleteUser(user: any): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
  
    if (confirmDelete) {
      // Faites appel au service pour supprimer l'utilisateur
      this.userService.deleteUser(user.id).subscribe(() => {
        // Si la suppression réussit, mettez à jour la liste des utilisateurs
        this.filteredUsers = this.users.filter(u => u.id !== user.id);
      });
    }
  }


  editUser(user: any): void {
    this.router.navigate(['/edit-user', user.id]);
  }
   
  detailUser(user: any): void {
    this.router.navigate(['/detail-user', user.id]);
  }
  
  

}
