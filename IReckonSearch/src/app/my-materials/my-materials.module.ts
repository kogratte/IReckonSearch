import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatToolbarModule, MatTabsModule, MatProgressSpinnerModule, MatDividerModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatInputModule, MatIconModule, MatTableModule, MatCardModule, MatListModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
     MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatSnackBarModule,
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatSnackBarModule,
        MatIconModule,
    MatInputModule,
    MatButtonModule,
     MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule
  ]
})
export class MyMaterialsModule { }
