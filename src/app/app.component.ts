import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';
import { BoxComponent } from '../components/Box/Box.component';
import { AsyncPipe } from '@angular/common';
import { Box } from '../models/Box.model';
import { SubBoxComponent } from '../components/SubBox/SubBox.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, BoxComponent, SubBoxComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  boxes$: Observable<Box[]> = new Observable<Box[]>();
  totalValue: number = 0;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.boxes$ = this.stateService.getBoxesState();
    this.boxes$.subscribe((boxes) => {
      this.totalValue = boxes.reduce((acc, { selectedOption }) =>
        acc + (selectedOption?.value || 0), 0);
    });
  }

  reset() {
    this.stateService.resetState();
  }
}
