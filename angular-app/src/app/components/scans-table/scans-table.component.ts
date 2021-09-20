import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NavComponent } from '../nav/nav.component';
import { Scan } from '../scanner/scan.model';


@Component({
  selector: 'app-scans-table',
  templateUrl: './scans-table.component.html',
  styleUrls: ['./scans-table.component.scss']
})
export class ScansTableComponent implements AfterViewInit {
  
  scanCol: AngularFirestoreCollection;
  displayedColumns = ['scanResult', 'personName', 'timeScanned', 'scanResultDesc']
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public nav: NavComponent,
    private afs: AngularFirestore
  ) { }


 ngAfterViewInit() {
  this.afs.collection<Scan>(`/projects/${this.nav.projectNumber}/scans`, ref => ref.orderBy('timeScanned', 'desc').limit(13)).valueChanges().subscribe(async data => {
    
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort
  })
 }

}
