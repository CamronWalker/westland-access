import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, take, tap } from 'rxjs/operators';
import { CustomSnackBarService } from './services/custom-snackbar.service';

@Directive({
  selector: '[appFireFormAutosave]'
})
export class FireFormAutosaveDirective implements OnInit, OnDestroy {
  @Input() path!: string;
  @Input() formGroup!: FormGroup;

  private _state: 'loading' | 'synced' | 'modified' | 'error' = "loading";

  @Output() stateChange = new EventEmitter<string>();
  @Output() formError = new EventEmitter<string>();

  private formSub!: Subscription;
  private docRef: any;
  docData: any;

  constructor(
    private firestore: Firestore,
    private snackbar: CustomSnackBarService
    
  ) {  }

  ngOnInit() {
    
    this.preloadData();
    this.autoSave();
  }

  preloadData() {
    this.state = 'loading';
    this.docRef = doc(this.firestore, `${this.path}`)

    this.docData = docData(this.docRef).pipe(
      tap(doc => {
        if (doc) {
          this.formGroup.patchValue(doc);
          this.formGroup.markAsPristine();
          this.state = 'synced';
        }
      }), take(1)
      )
      .subscribe()
  }

  autoSave() {
    this.formSub = this.formGroup.valueChanges
      .pipe(
        tap(change => {
          this.state = 'modified';
        }),
        debounceTime(2000),
        tap(change => {
          if (this.formGroup.valid && this._state === 'modified') {
            this.setDoc()
          }
        })
      )
      .subscribe();
  }

    // Writes changes to Firestore
    async setDoc() {
      try {

        await updateDoc(doc(this.firestore, `${this.path}`), this.formGroup.value)
        //await this.docRef.set(this.formGroup.value, { merge: true });
        
        this.state = 'synced';
        //this.snackbar.success('Form Synced Successfully', 4000, 'bottom');  // not used because the status is shown elsewhere

      } catch (err) {
        console.log(err)
        //this.formError.emit(err.message)
        this.state = 'error';
        this.snackbar.error('Something Went Wrong Submitting Your Form Updates: ' + err, 6000, 'top')
      }
    }

  // Determines if path is a collection or document (CHANGED FOR ONLY EXISTING DOCUMENTS!)
  getDocRef(path: string): any {
    if (path.split('/').length % 2) {

      //return this.afs.doc(`${path}/${this.afs.createId()}`);
    } else {
      
      //return this.afs.doc(path);
    }
  }


  // Setter for state changes
  set state(val: any) {
    this._state = val;
    this.stateChange.emit(val);
  }



  // Intercept form submissions to perform the document write
  @HostListener('ngSubmit', ['$event'])
  onSubmit(e: any) {
    this.setDoc();
  }
    
  ngOnDestroy() {
    this.formSub.unsubscribe();
  }

}
