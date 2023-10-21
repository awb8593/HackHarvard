import { Component, Input } from '@angular/core';
import { Provider } from '../models/provider.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() provider?: Provider;
}
