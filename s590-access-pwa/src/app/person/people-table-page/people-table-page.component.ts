import { Component, OnInit, ViewChild } from '@angular/core';
import { Firestore, collection, query, orderBy, collectionData, limit, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-people-table-page',
  templateUrl: './people-table-page.component.html',
  styleUrls: ['./people-table-page.component.scss']
})
export class PeopleTablePageComponent implements OnInit {

  
  displayedColumns = ['id', 'firstName', 'lastName', 'companyName', 'status', 'trade', 'actions']
  peopleData!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  peopleTableFilter!: FormGroup;

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.peopleTableFilter = this.fb.group({
      peopleFilterValue: '',
    })

    if (this.peopleTableFilter.get('peopleFilterValue')?.value) {
      
    } else {

    }

    this.peopleTableFilter.controls['peopleFilterValue'].valueChanges.pipe(debounceTime(1000)).subscribe(form => {
      console.log(form)
      if (form == '') {
        console.log(form)
        const peopleRef = collection(this.firestore, 'projects/S590/people')
        const peopleColQuery = query(peopleRef, orderBy('badgeNum', 'asc'), limit(15))

        collectionData(peopleColQuery, { idField: 'id' }).subscribe(scans => {
          this.peopleData = new MatTableDataSource(scans)
          this.peopleData.sort = this.sort
        })
      } else {
        const peopleRef = collection(this.firestore, 'projects/S590/people')
        const peopleColQuery = query(peopleRef, orderBy('badgeNum', 'asc'), where('searchArray', 'array-contains', form), limit(1))

        collectionData(peopleColQuery, { idField: 'id' }).subscribe(scans => {
          this.peopleData = new MatTableDataSource(scans)
          this.peopleData.sort = this.sort
        })
      }
    });

  }

}
