import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { collectionData, Firestore, orderBy, limit, collection, query } from '@angular/fire/firestore';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-scans-table',
  templateUrl: './scans-table.component.html',
  styleUrls: ['./scans-table.component.scss']
})
export class ScansTableComponent implements OnInit {


  displayedColumns = ['scanResult', 'personName', 'timeScanned', 'scanResultDesc', 'actions']
  scansData!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @Input('queryLimit') queryLimit!: number;

  constructor(
    private firestore: Firestore,

  ) { }

  ngOnInit(): void {
// this.afs.collection<Scan>(`/projects/${this.nav.projectNumber}/scans`, ref => ref.orderBy('timeScanned', 'desc').limit(13)).valueChanges().subscribe(async data => {

    const scanColRef = collection(this.firestore, '/projects/S590/scans')
    const scansQuery = query(scanColRef, orderBy('timeScanned', 'desc'), limit(this.queryLimit));
    
    collectionData(scansQuery, { idField: 'id' }).subscribe(scans => {
      this.scansData = new MatTableDataSource(scans)
      this.scansData.sort = this.sort
    })

  }

}
