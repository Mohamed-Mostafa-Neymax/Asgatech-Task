import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { TextComponent } from '@app/components/ui/text/text.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [TextComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  rangeDate = signal(new Date().getFullYear());
}
