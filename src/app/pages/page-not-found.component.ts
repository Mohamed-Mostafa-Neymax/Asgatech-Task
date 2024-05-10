import { Component } from '@angular/core';

import { NotFoundComponent } from '@app/components/not-found/not-found.component';

@Component({
  selector: 'app-page-not-found',
  template: '<app-not-found></app-not-found>',
  standalone: true,
  imports: [NotFoundComponent]
})
export class PageNotFoundComponent {

}
