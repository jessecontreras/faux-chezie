//Ng dependencies
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

//Local dependencies
import { User } from 'src/app/_models/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { ModalComponent } from '../modal/modal.component';
import { DeleteErgWarningComponent } from '../delete-erg-warning/delete-erg-warning.component';
import { ERG } from '../_models/erg.model';
import { ErgService } from '../_services/erg.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user!: User | null;
  //ergs
  ergs: ERG[] = [];
  ergMemberCount: number = 0;

  constructor(
    private accountService: AccountService,
    public matDialog: MatDialog,
    private ergService: ErgService
  ) {
    this.user = this.accountService.userValue;
  }

  /**
   * Subscribe to erg subject and then call to get all ergs.
   */
  async ngOnInit() {
    await this.ergDataSetup();
  }

  /**
   * Subscribes to data service, will assign class ergs from ergService subject.
   * Assigns ergMember count based on the accumulation of numberOfMembers of all ERGs.
   *
   * @returns {Promise<void>} Returns void
   */
  async ergDataSetup(): Promise<void> {
    try {
      this.ergService.ergSubject$.subscribe((ergs) => {
        if (ergs != null) {
          this.ergs = ergs;
          //Reset memberCount, otherwise the value (state) is saved and re-added in the addition of another ERG.
          let memberCount = 0;
          this.ergs.forEach((erg) => {
            memberCount += erg.numberOfMembers;
          });
          this.ergMemberCount = memberCount;
        }
      });
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  /**
   * Calculates the total amount of erg members.
   * @returns {Promise<number>} total number of erg members.
   */
  async calcErgMemberCount(): Promise<number> {
    try {
      let memberCount = 0;
      if (this.ergs) {
        this.ergs.forEach((erg) => {
          memberCount += erg.numberOfMembers;
        });
        //Assign this to our class variable...we technically don't need a return, we do bc we need to return a Promise<number> but we really don't.
        this.ergMemberCount = memberCount;
      }
      return memberCount;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Opens dialog box to add erg.
   */
  async openAddErgDialog() {
    try {
      this.matDialog.open(ModalComponent, {
        scrollStrategy: new NoopScrollStrategy(),
        height: '500px',
        width: '700px',
        id: 'modal-component',
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Opens dialog box to confirm erg deletion.
   * Deletes ERG in event of confirmed deletion.
   */
  async openConfirmErgDeletion(ergId: string | undefined) {
    try {
      const ref = this.matDialog
        .open(DeleteErgWarningComponent, {
          scrollStrategy: new NoopScrollStrategy(),
          id: 'confirm-delete',
          height: '300px',
          width: '300px',
        })
        .afterClosed()
        .subscribe((response: any) => {
          if (response.delete) {
            this.ergService.deleteErg(ergId!);
          }
          return;
        });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
