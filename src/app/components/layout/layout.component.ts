import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  template: `
    <main class="d-flex flex-column justify-content-between h-100">
      <section>
        <app-nav />
        <ng-content />
      </section>
      <app-footer />
    </main>
  `,
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  
}
