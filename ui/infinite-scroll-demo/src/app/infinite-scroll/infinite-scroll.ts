import { Component } from '@angular/core';
import { ApiCall, PageResponse } from '../api-call';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './infinite-scroll.html',
  styleUrls: ['./infinite-scroll.css']
})
export class InfiniteScroll {
  numbers: number[] = [];
  page = 0;
  size = 10;
  totalPages = 100;
  loading = false;

  constructor(private api_svc: ApiCall) {}

  ngOnInit(): void {
    this.loadNumbers();
  }

  onScroll(): void {
  if (this.loading || this.page >= this.totalPages) return;
  this.loadNumbers();
}

loadNumbers(): void {
  if (this.loading || this.page >= this.totalPages) return;

  this.loading = true;

  this.api_svc.getNumbers<number>(this.page, this.size).subscribe({
    next: (response: PageResponse<number>) => {
      const fetched = response.content || [];
      this.numbers.push(...fetched);

      this.totalPages = response.totalPages ?? this.totalPages;
      this.page++;

      if (response.totalPages == null && fetched.length < this.size) {
        this.totalPages = this.page;
      }

      this.loading = false;
    },
    error: () => this.loading = false
  });
}

}