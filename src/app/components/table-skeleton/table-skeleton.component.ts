import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-table-skeleton',
    standalone: true,
    imports: [],
    templateUrl: './table-skeleton.component.html',
    styleUrl: './table-skeleton.component.scss'
})
export class TableSkeletonComponent {

    @Input({ required: true })
    public rows!:number;

    @Input()
    public helperText?:string;

    public rowsArray: number[] = [];

    ngOnChanges() {
        this.rowsArray = Array(this.rows).fill(0);
    }
}
