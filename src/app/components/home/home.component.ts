import { Component, OnInit } from '@angular/core';
import { VeterinaryClinic } from 'src/app/models/entities/veterinaryClinic';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';
import { VeterinaryClinicService } from 'src/app/services/veterinary-clinic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  veterinaryClinics: VeterinaryClinic[];


  constructor(
    private vetClinicService: VeterinaryClinicService,
    private petService: PetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserClinic();
  }

  getUserClinic() {
    this.vetClinicService.getByUserClinic().subscribe(response=>{
      this.veterinaryClinics = response.data;
      console.log('response:', response.data);
    })
  }

  // getByPetUser() {
  //   this.petService.getByPetUserId().subscribe(response=>{
  //     console.log('response', response.data);
  //   })
  // }
}
