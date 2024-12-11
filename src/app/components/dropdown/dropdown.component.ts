import { Component, ContentChildren, Input, signal } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

    @Input({required: true})
    public buttonText: string = '';
    
    @Input({required: true})
    public options: { label: string, action: () => void }[] = [];

    public open = signal<boolean>(false);
    
    public handleBlur() {
        this.open.set(false);
    }

    public handleClic(){
        this.open.update((prev) => !prev);
    }
}
