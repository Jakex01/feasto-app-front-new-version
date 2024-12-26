import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
export interface FilterConfig {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
}
@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private resetFiltersSubject = new BehaviorSubject<boolean>(false);
  public resetFilters$ = this.resetFiltersSubject.asObservable();
  constructor() { }

  public resetFilters(): void {
    this.resetFiltersSubject.next(true);
  }

  readonly filterOptions: FilterConfig[] = [
    {
      name: 'foodType',
      label: 'Food Type',
      placeholder: 'Select Food Type',
      options: [
        { value: 'Italian', label: 'Italian' },
        { value: 'Chinese', label: 'Chinese' }
      ]
    },
    {
      name: 'rating',
      label: 'Rating',
      placeholder: 'Select Rating',
      options: [
        { value: '3.0', label: '3.0' },
        { value: '4.0', label: '4.0' },
        { value: '5.0', label: '5.0' }
      ]
    },
    {
      name: 'priceRange',
      label: 'Price',
      placeholder: 'Select Price Range',
      options: [
        { value: '15', label: '$' },
        { value: '30', label: '$$' },
        { value: '45', label: '$$$' }
      ]
    },
    {
      name: 'sort',
      label: 'Sort',
      placeholder: 'Sort by',
      options: [
        { value: 'prices', label: 'Price' },
        { value: 'rating', label: 'Rating' }
      ]
    }
  ];

  getFilterOptions(): FilterConfig[] {
    return this.filterOptions;
  }

}
