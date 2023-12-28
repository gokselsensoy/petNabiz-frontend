import { Component, OnInit } from '@angular/core';
import { PetService } from './services/pet.service';
import { Pet } from './models/entities/pet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'petNabiz';

}
