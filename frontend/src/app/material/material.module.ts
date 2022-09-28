//Ng dependencies
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


const materialModules: any = [
  MatCardModule,
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AngularMaterialModule {}
