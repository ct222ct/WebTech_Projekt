import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { VehicleService } from '../services/vehicle.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class ProfileComponent {
  user: any = {
    name: '',
    email: '',
    address: '',
  };
  vehicles: any[] = [];
  editProfile: boolean = false;
  editVehicleId: number | null = null;

  constructor(
    protected userService: UserService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadVehicles();
  }

  loadUserData(): void {
    this.userService.getUserData().subscribe((data) => {
      this.user = data;// Lade gespeicherte Benutzerdaten
    });
  }

  loadVehicles(): void {
    this.vehicleService.getUserVehicles().subscribe((data) => {
      this.vehicles = data;
    });
  }

  toggleEditProfile(): void {
    this.editProfile = !this.editProfile;
  }

  saveProfile(): void {
    this.userService.updateUserData(this.user).subscribe(() => {
      this.editProfile = false;
      alert('Profil erfolgreich aktualisiert!');
    });
  }

  deleteVehicle(vehicleId: number): void {
    if (confirm('Möchten Sie diese Anzeige wirklich löschen?')) {
      this.vehicleService.deleteVehicle(vehicleId).subscribe(() => {
        this.vehicles = this.vehicles.filter((v) => v.id !== vehicleId);
        alert('Anzeige wurde gelöscht.');
      });
    }
  }

  editVehicle(vehicleId: number): void {
    this.editVehicleId = vehicleId;
  }

  saveVehicle(vehicle: any): void {
    this.vehicleService.updateVehicle(vehicle).subscribe(() => {
      this.editVehicleId = null;
      alert('Anzeige erfolgreich aktualisiert!');
    });
  }
}
