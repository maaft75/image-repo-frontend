import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostimageComponent } from './postimage.component';

describe('PostimageComponent', () => {
  let component: PostimageComponent;
  let fixture: ComponentFixture<PostimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
