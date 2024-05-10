import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  standalone: true,
  imports: [ NgClass ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
  classes = input.required<string>();
  truncateActive = input<boolean>();
}
