import { Component, OnInit } from '@angular/core';
import {Outfit} from '../outfit-model/outfit.model';

@Component({
  selector: 'app-outfit-container',
  inputs: ['outfit'],
  templateUrl: './outfit-container.component.html',
  styleUrls: ['./outfit-container.component.css']
})
export class OutfitContainerComponent implements OnInit {

  outfit: Outfit;

  ngOnInit() {
  }

}
