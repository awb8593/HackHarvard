import { Component } from '@angular/core';
import { TerraService } from './terra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hackharvard';

  constructor(public terraService: TerraService) {}

  getNumItems(): void {
    console.log(this.terraService
    .getProviders());
    // .then((p: any) => {
    //   console.log(p);
    // })
    }  
    
  
}
