import { Component, Input } from '@angular/core';
import { UserDetails } from '../Models/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input() user!: UserDetails;

constructor(){}
}
