// profile.component.ts
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterServiceService} from "../../../services/registerAgent/register-service.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  profile!:FormGroup

  constructor(private authService:RegisterServiceService, private fb: FormBuilder,private http:HttpClient) {
  }
  @Input() step: number = 1;
  @Output() stepChange = new EventEmitter<number>();
  @Output() scrollToTopRequest = new EventEmitter<void>();

  // Your existing code
  selectedFiles: any[] = [];
  coverExist:boolean=false
  next:boolean=false;
  increaseStep() {
    this.authService.getInfoUserProfile(this.profile)
    if(!this.next){
      this.stepChange.emit(this.step + 1);
      this.scrollToTop();
    }

  }

  decreaseStep() {
    if (this.step > 1) {
      this.stepChange.emit(this.step - 1);
      this.scrollToTop();
    }
  }

  scrollToTop() {
    this.scrollToTopRequest.emit();
  }

  upload(event: any) {
    const files = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.profile.get('imageUrl')?.setValue(file['name'])
        const format = new FormData();
        /*console.log(file[i].name)*/
        format.append('file',file);
        this.http.post("http://localhost:8080/jibi/backOffice/upload",format).subscribe();
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({ file: file, url: e.target.result });
          console.log(this.selectedFiles[0].url);

        };
        reader.readAsDataURL(file);
        this.coverExist=true;
      }
    }
  }

  changeCover() {
    this.selectedFiles=[];
    let open = document.getElementById('file-upload');
    if(open!=null){
      open.click()
      console.log(this.selectedFiles[0])
    }
  }

  ngOnInit(): void {
    this.profile = this.fb.group({
      username:[""],
      imageUrl:[""],
    })
  }

  isProfileEmpty() {
    const username = this.profile.get('username')?.value;
    const imageUrl = this.profile.get('imageUrl')?.value;
    if(!username || !imageUrl){
      this.next=true;
      return true
    }else{
      this.next=false;
      return false
    }
  }

}
