import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <main class="d-flex flex-column justify-content-between h-100">
      <section>
        <nav>Navbar</nav>
        <ng-content></ng-content>
      </section>
      <footer>Footer</footer>
    </main>
  `,
  standalone: true
})
export class LayoutComponent {
  
}
