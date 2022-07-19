import { NetworkService } from './../../../services/network.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-main-accountant',
    templateUrl: './main-accountant.component.html',
    styleUrls: ['./main-accountant.component.css']
})

export class MainAccountantComponent implements OnInit {

    
    constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService, private networkService: NetworkService) { }

    ngOnInit() {        
      
    }
     

}
