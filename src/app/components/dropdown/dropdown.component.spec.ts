import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
    let component: DropdownComponent;
    let fixture: ComponentFixture<DropdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DropdownComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(DropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should by close by default', () => {
        expect(component.open()).toBeFalse();
    });

    it('should open when clicked', () => {
        component.handleClic();
        expect(component.open()).toBeTrue();
    });

    it('should close when clicked again', () => {
        component.handleClic();
        component.handleClic();
        expect(component.open()).toBeFalse();
    });

    it('should close when blur', () => {
        component.handleClic();
        component.handleBlur();
        expect(component.open()).toBeFalse();
    });
});
