import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {EntriesService} from '../entries/state/entries.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UniqueYearsService {
  private uniqueYearsSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);
  uniqueYears: Observable<number[]> = this.uniqueYearsSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.getUniqueYears();
  }

  async getUniqueYears(): Promise<void> {
    this.uniqueYearsSubject.next(
      await this.http.get<string[]>(`${environment.apiUrl}/entry-years`).pipe(
        map(years => years.map(y => parseInt(y, 10)).sort((a, b) => b - a))
      ).toPromise()
    );
  }
}
