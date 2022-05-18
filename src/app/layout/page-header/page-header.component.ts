import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

    urls = []
    @Input() urlName
    @Input() secondaryUrlName
    @Input() urlPath

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.url.subscribe(url => {
            this.urls = url.map(v => ({nome: v.path.charAt(0).toUpperCase() + v.path.slice(1), path: v.path}))
            if(this.urlName) this.urls[0].nome = this.urlName
            if(this.urlPath) this.urls[0].path = this.urlPath
            if(this.secondaryUrlName) this.urls[1] = {nome: this.secondaryUrlName}
        })
    }

    navigate(route) {
        this.router.navigate([`${route}`])
    }

}
