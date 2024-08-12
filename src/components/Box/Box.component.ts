
import { Component, Input } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Option } from '../../models/Box.model';


@Component({
  selector: 'app-box',
  standalone: true,
  templateUrl: './Box.component.html',
})
export class BoxComponent {
  @Input() id!: number;
  @Input() selectedOption?: Option | null;
  @Input() options!: Option[];
  @Input() selected!: boolean;

  constructor(private stateService: StateService) { }

  selectBox(): void {
    this.stateService.selectBoxState(this.id);
  }

  getOptionBackgroundColor(): string {
    return this.selected ? '#81ffdb' : 'white';
  }

}
