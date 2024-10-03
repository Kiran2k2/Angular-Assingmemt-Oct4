import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAgGridComponent } from './product-ag-grid.component';

describe('ProductAgGridComponent', () => {
  let component: ProductAgGridComponent;
  let fixture: ComponentFixture<ProductAgGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAgGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
