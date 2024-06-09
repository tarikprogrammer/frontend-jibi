import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthClientService} from "../../../services/authClient/auth-client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent  implements OnInit{
  profile!:FormGroup;
  selectedFiles: any[] = [];
  cover:string="";
  coverExist:boolean=false;
  coverUpdated:boolean=false;
  currentClient=sessionStorage.getItem('currentClient');
  isLoader: boolean=false;
  isChangedCover: boolean=false;
  changeCoverMsg: string="";
  constructor(private fb:FormBuilder,private http:HttpClient,private serviceClient:AuthClientService,private router:Router) {
  }

  ngOnInit() {
    this.profile=this.fb.group({
       cover:[''],
       phone:[this.getSession().phone]
    })
  }

  changeCover(event: any) {
    const files = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.profile.get('cover')?.setValue(file['name'])
        const format = new FormData();
        format.append('file',file);
        this.http.post("http://localhost:8080/jibi/backOffice/upload",format).subscribe();
        console.log("file name",this.profile.value)
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

  update() {
    this.isLoader=true;
    this.serviceClient.getCoverUpdated(this.profile);
    setTimeout(()=>{
      this.serviceClient.updateCoverForClient().subscribe((response:any)=>{
        console.log(response);
        this.serviceClient.isCoverUpdated=response
        this.isLoader=false;
        sessionStorage.setItem('currentClient', JSON.stringify(response));
        window.location.reload();
        if(response){
          this.changeCoverMsg="cover has been changed successfully";
          setTimeout(()=>{
            this.changeCoverMsg="";
          },2000)
        }

      },)
    },2000)
  }
  getSession(){
    return this.currentClient ? JSON.parse(this.currentClient):null
  }
}
