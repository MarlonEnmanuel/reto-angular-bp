import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertContainerComponent } from "../alert-container/alert-container.component";

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [RouterOutlet, AlertContainerComponent],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
