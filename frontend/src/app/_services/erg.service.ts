//Ng imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
//Local imports
import { environment } from 'src/environments/environment';
import { ERG } from '../_models/erg.model';
import { registerLocaleData } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ErgService {
  public ergSubject$: BehaviorSubject<ERG[] | null>;
  public ergs$: Observable<ERG[] | null>;
  constructor(private router: Router, private http: HttpClient) {
    this.ergSubject$ = new BehaviorSubject<ERG[] | null>(
      JSON.parse(localStorage.getItem('ergs')!)
    );

    this.ergs$ = this.ergSubject$.asObservable();
  }

  /**
   * Easy getter for user.
   */
  public get ergsValue(): ERG[] | null {
    return this.ergSubject$.value;
  }

  /**
   * Gets all ERG
   * @returns {Promise<ERG[]|[]>} An array of ERGs or a lone array.
   */
  async getAllErgs(): Promise<ERG[] | []> {
    try {
      const response = await firstValueFrom(
        this.http.get<ERG[]>(`${environment.api}/ergs`)
      );
      //Narrow type check
      if ('error' in response) {
        return response;
      }
      //Check for the null case, if so assign ergs an empty array.
      const ergs = this.ergsValue ? this.ergsValue : [];

      localStorage.setItem('ergs', JSON.stringify(response));
      this.ergSubject$.next(response);

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  /**
   * Creates ERG.
   * @param ergToCreate - ERG object to be created.
   * @returns {<Promise<ERG>} - ERG value.
   */
  async createErg(ergToCreate: ERG): Promise<ERG> {
    try {
      const response = await firstValueFrom(
        this.http.post<ERG>(`${environment.api}/ergs`, { erg: ergToCreate })
      );

      //Narrow type check
      if ('error' in response) {
        return response;
      }
      //Check for the null case, if so assign ergs an empty array.
      const ergs = this.ergsValue ? this.ergsValue : [];
      ergs.push(response);
      localStorage.setItem('ergs', JSON.stringify(ergs));
      this.ergSubject$.next(ergs);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  /**
   * Delete selected ERG.
   * @param _id - ERG id.
   * @returns {Promise<void>}
   */
  async deleteErg(_id: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.delete<any>(`${environment.api}/ergs/${_id}`)
      );
      //Get index of erg to remove from ergs.
      const ergIndex = this.ergsValue?.findIndex((erg) => {
        return erg._id === response._id;
      });
      //Remove erg from our ergsValue array.
      this.ergsValue?.splice(ergIndex!, 1);
      //update our local storage ergs
      localStorage.setItem('ergs', JSON.stringify(this.ergsValue));
      //update our subject to broadcast changes to subcribers.
      this.ergSubject$.next(this.ergsValue);
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }


} //end class
