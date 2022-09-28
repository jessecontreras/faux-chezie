//Ng dependencies
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
//Local dependencies
import { ERG } from '../_models/erg.model';
import { ErgService } from '../_services/erg.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder,
    private ergService: ErgService,
    private alertService: AlertService
  ) {}

  //Set our stepper as linear
  isLinear: boolean = true;

  firstFormGroup = this.fb.group({
    ergName: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    numberOfMembers: ['', [Validators.required, Validators.min(1)]],
  });

  /**
   * Calls service to create erg if values are valid
   * @returns {Promise<void>}
   */
  async createErg() {
    try {
      if (!this.firstFormGroup.valid || !this.secondFormGroup.valid) {
        this.alertService.error(
          'Your ERG name or the number of members in ERG is invalid.'
        );
        return;
      }
      const ergToCreate = new ERG(
        this.firstFormGroup.controls['ergName'].value,
        parseInt(this.secondFormGroup.controls['numberOfMembers'].value)
      );

      await this.ergService.createErg(ergToCreate);
      this.closeModal();
      this.alertService.success('Successfully created ERG');

      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Closes Modal
   */
  closeModal() {
    this.dialogRef.close();
  }
}
