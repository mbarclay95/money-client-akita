import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {HttpClient} from '@angular/common/http';
import {GoalsStore} from './goals.store';
import {createGoal, Goal} from './goal.model';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class GoalsService {

  constructor(
    private goalsStore: GoalsStore,
    private http: HttpClient
  ) {
  }

  async get(): Promise<void> {
    await this.http.get<Goal[]>(`${environment.apiUrl}/goals`).pipe(
      map(entities => entities.map(g => createGoal(g))),
      tap(entities => this.goalsStore.set(entities))
    ).toPromise();
  }

  async add(goal: Goal): Promise<void> {
    await this.http.post<Goal>(`${environment.apiUrl}/goals`, goal).pipe(
      tap(newGoal => this.goalsStore.add(createGoal(newGoal)))
    ).toPromise();
  }

  update(id, goal: Partial<Goal>): void {
    this.goalsStore.update(id, goal);
  }

  remove(id: ID): void {
    this.goalsStore.remove(id);
  }
}
