import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CustomSnackBarService } from 'src/app/shared/services/custom-snackbar.service';


@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  userProfileForm!: FormGroup;
  state!: string;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private snackbar: CustomSnackBarService
    ) { }

  ngOnInit(): void {

    this.userProfileForm = this.fb.group({
      customString: '',
      defaultView: 'default',
      defaultScanner: 'false',
    })
  }

  changeHandler(e: any) {
    this.state = e
    // if ( this.state === "synced") {  // This doesn't work very well in the child component like this because it fires on load
    //   this.snackbar.success('Settings updated successfully!', 3000, 'bottom')
    // }
  }
}
