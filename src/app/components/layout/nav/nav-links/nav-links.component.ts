import { Component, input, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
  standalone: true,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavLinksComponent {
  classes = input.required<string>();
  navItems = signal([
    { id: 1, title: 'Products', url: '/' },
    { id: 2, title: 'Orders', url: '/orders' }
  ]);
}