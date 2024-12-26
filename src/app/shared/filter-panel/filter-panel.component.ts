import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatOptionModule} from "@angular/material/core";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {Subscription} from "rxjs";
import {FilterService} from "../../service/shared/filter.service";

export interface FilterOption {
  value: string | number;
  label: string;
}

export interface FilterConfig {
  name: string;
  label: string;
  placeholder: string;
  options: FilterOption[];
  selectedValue?: string | number;
}
@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatFormField,
    MatFormFieldModule,
    MatOption,
    MatSelectModule,
    MatOptionModule,
    MatSelect,
    NgIf
  ],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css'
})
export class FilterPanelComponent implements OnInit, OnDestroy{

  @Input() filters: any[] = [];
  @Input() searchTerm: string = '';
  @Output() filterChanged = new EventEmitter<any>();
  private resetSubscription: Subscription;

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.resetSubscription = this.filterService.resetFilters$.subscribe(reset => {
      if (reset) {
        this.resetAllFilters();
      }
    });
  }
  ngOnDestroy(): void {
    this.resetSubscription.unsubscribe();
  }
  onFilterChange() {
    const selectedFilters = this.filters.reduce((acc, filter) => {
      if (filter.selectedValue !== undefined) {
        acc[filter.name] = filter.selectedValue;
      }
      return acc;
    }, {});
    this.filterChanged.emit(selectedFilters);
  }
  resetAllFilters() {
    this.filters.forEach(filter => {
      filter.selectedValue = filter.placeholder ? null : undefined;
    });
    this.onFilterChange();
  }

}

