import { Component, OnInit } from '@angular/core';
import { getVolume, setVolume } from 'src/services/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Retrieves the volume level and converts the it to a 0-100 scale for the slider
   * @returns 
   */
  getVolume(): number {
    return getVolume()*100;
  }

  /**
   * Converts the volume string from the slider back to a 0-1 scale before storing
   * @param volume
   */
  setVolume(volume: string) {
    setVolume(parseInt(volume)/100);
    console.log(getVolume());
  }
}
