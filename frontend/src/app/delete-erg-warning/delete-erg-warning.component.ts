import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-erg-warning',
  templateUrl: './delete-erg-warning.component.html',
  styleUrls: ['./delete-erg-warning.component.scss'],
})
export class DeleteErgWarningComponent {
  constructor(private dialogRef: MatDialogRef<DeleteErgWarningComponent>) {}

  /**
   * If modal is manually close by delete button, delete ERG.
   * @returns {Promise<void>}
   */
  async delete(): Promise<void> {
    try {
      this.dialogRef.close({ delete: true });
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
