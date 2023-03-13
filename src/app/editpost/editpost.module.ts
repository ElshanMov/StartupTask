import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditpostComponent } from './editpost.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditpostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: EditpostComponent
    }]),
    ReactiveFormsModule
  ],
  exports: [
    EditpostComponent
  ]
})
export class EditpostModule { }
