import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [ MatIconModule ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  classes = input.required<string>();
  btnText = input.required<string>();
  buttonType = input.required<string>();
}
