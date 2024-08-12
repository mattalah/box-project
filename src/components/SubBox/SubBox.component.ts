import { Component, Input } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Option } from '../../models/Box.model';

@Component({
  selector: 'app-sub-box',
  standalone: true,
  imports: [],
  templateUrl: './SubBox.component.html',
})
export class SubBoxComponent {

  @Input() id!: number;
  @Input() selectedOption?: Option | null;
  @Input() option!: Option;

  constructor(private stateService: StateService) { }

  selectOption(option: Option) {
    this.stateService.updateBoxState(this.id, option);
  }
  getOptionBackgroundColor(option: Option): string {
    return this.selectedOption?.id === option.id ? '#8d95f1d1' : 'white';
  }
}
