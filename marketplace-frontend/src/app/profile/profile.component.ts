import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  imports: [
    FormsModule
  ]
})
export class ProfileComponent implements OnInit {
  user = {
    email: '',
    address: '',
    password: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((data) => {
      this.user.email = data.email;
      this.user.address = data.address;
    });
  }
  updateProfile(): void {
    const { password, ...updatedUser } = this.user; // Erstellt eine Kopie ohne 'password'

    this.userService.updateUser(updatedUser).subscribe(
      () => alert('Profile updated successfully!'),
      (error) => alert('Failed to update profile.')
    );
  }
}
