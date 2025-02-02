import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})

export class HomeComponent {
  goToDashboard() {
    // Replace '/vehicles' with the actual route for the vehicle page
    window.location.href = '/dashboard';
  }
}
