// pagination.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="pagination">
      <button [disabled]="currentPage === 1" (click)="changePage(currentPage - 1)">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button [disabled]="currentPage === totalPages" (click)="changePage(currentPage + 1)">Next</button>
    </div>
  `,
  styles: [
    `
      .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageChange.emit(newPage);
    }
  }
}
