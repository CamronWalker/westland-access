import { Component, OnInit, ViewChild } from '@angular/core';
import { Firestore, collection, query, orderBy, collectionData, limit } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-people-table-page',
  templateUrl: './people-table-page.component.html',
  styleUrls: ['./people-table-page.component.scss']
})
export class PeopleTablePageComponent implements OnInit {

  
  displayedColumns = ['id', 'firstName', 'lastName', 'companyName', 'status', 'trade', 'actions']
  peopleData!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    const peopleRef = collection(this.firestore, 'projects/S590/people')
    const peopleColQuery = query(peopleRef, orderBy('badgeNum', 'asc'), limit(50))

    collectionData(peopleColQuery, { idField: 'id' }).subscribe(scans => {
      this.peopleData = new MatTableDataSource(scans)
      this.peopleData.sort = this.sort
    })

  }

}
