import { Component, Input, output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

    @Input({ required: true }) public totalItems: number = 0;
    @Input({ required: true }) pageSize: number = 5;
    public changePage = output<number>();

    public totalPages: number = 0;
    public currentPage: number = 1;
    public visiblePages: number[] = [];

    ngOninit() {
        this.calculatePages();
    }

    ngOnChanges() {
        this.calculatePages();
    }

    calculatePages(): void {
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
            this.changePage.emit(this.currentPage);
        }

        let startPage: number = 0;
        let endPage: number = 0;

        if (this.totalPages <= 5) {
            startPage = 1;
            endPage = this.totalPages;
        } else if (this.currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (this.currentPage + 2 >= this.totalPages) {
            startPage = this.totalPages - 4;
            endPage = this.totalPages;
        } else {
            startPage = this.currentPage - 2;
            endPage = this.currentPage + 2;
        }

        let pages = [];
        for (let i = startPage; i <= endPage; i++) pages.push(i);
        this.visiblePages = pages;
    }

    handleClicPage(page: number): void {
        if (page < 1 || page > this.totalPages || page === this.currentPage)
            return;

        this.currentPage = page;
        this.changePage.emit(this.currentPage);
        this.calculatePages();
    }
}
