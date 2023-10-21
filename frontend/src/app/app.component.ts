import { Component } from '@angular/core';
import { TerraService } from './terra.service';
import { RootService } from './root/root.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hackharvard';
  rootService: RootService;

  constructor(public terraService: TerraService, rootService: RootService) {
    this.rootService = rootService;
  }

  ngOnInit() {
    this.rootService.getPatientAlert();
  }

  getNumItems(): void {
    console.log(this.terraService
    .getProviders());
    // .then((p: any) => {
    //   console.log(p);
    // })
    }  
    
  
}
