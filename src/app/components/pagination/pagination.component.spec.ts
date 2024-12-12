import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaginationComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate total pages correctly', () => {
        component.totalItems = 50;
        component.pageSize = 10;
        component.calculatePages();
        expect(component.totalPages).toBe(5);
    });

    it('should show all pages', () => {
        component.totalItems = 20;
        component.pageSize = 5;
        component.calculatePages();
        expect(component.visiblePages).toEqual([1, 2, 3, 4]);
    });

    it('should show first pages', () => {
        component.totalItems = 100;
        component.pageSize = 10;
        component.currentPage = 2;
        component.calculatePages();
        expect(component.visiblePages).toEqual([1, 2, 3, 4, 5]);
    });

    it('should show last pages', () => {
        component.totalItems = 100;
        component.pageSize = 10;
        component.currentPage = 9;
        component.calculatePages();
        expect(component.visiblePages).toEqual([6, 7, 8, 9, 10]);
    });

    it('should show middle pages', () => {
        component.totalItems = 100;
        component.pageSize = 10;
        component.currentPage = 5;
        component.calculatePages();
        expect(component.visiblePages).toEqual([3, 4, 5, 6, 7]);
    });

    it('should emit changePage when current page is invalid', () => {
        spyOn(component.changePage, 'emit');
        component.totalItems = 100;
        component.pageSize = 10;
        component.currentPage = 11;
        component.calculatePages();
        expect(component.changePage.emit).toHaveBeenCalledWith(10);
        expect(component.currentPage).toBe(10);
    });

    it('should emit changePage with valid page', () => {
        spyOn(component.changePage, 'emit');
        component.totalItems = 100;
        component.totalPages = 10;
        component.pageSize = 10;
        component.currentPage = 1;
        component.handleClicPage(3);
        expect(component.changePage.emit).toHaveBeenCalledWith(3);
        expect(component.currentPage).toBe(3);
    });

    it('should not emit changePage with invalid page', () => {
        spyOn(component.changePage, 'emit');
        component.totalItems = 100;
        component.totalPages = 10;
        component.pageSize = 10;
        component.currentPage = 1;
        component.handleClicPage(11);
        expect(component.changePage.emit).not.toHaveBeenCalled();
        expect(component.currentPage).toBe(1);
    });

    it('should not emit changePage with current page', () => {
        spyOn(component.changePage, 'emit');
        component.totalItems = 100;
        component.totalPages = 10;
        component.pageSize = 10;
        component.currentPage = 5;
        component.handleClicPage(5);
        expect(component.changePage.emit).not.toHaveBeenCalled();
    });
});
