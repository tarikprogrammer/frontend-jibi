import {Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import {RegisterServiceService} from "../../../services/registerAgent/register-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-personal-infos',
  templateUrl: './personal-infos.component.html',
  styleUrls: ['./personal-infos.component.css']
})
export class PersonalInfosComponent implements OnInit,AfterViewInit{
  userInfo!:FormGroup;
  emailMatch:boolean=true;
  emailConfirm:string="";
  mergeData!:FormGroup;
  isCreated:boolean=false;
  agentCreated="";
  showToast:boolean=false;
  loader:boolean=false;
  passwordStatus:boolean=false;
  selectedFiles: any[] = [];
  constructor(private registerService:RegisterServiceService,private fb:FormBuilder,private http:HttpClient) {
  }
  @Input() step: number = 2;
  @Output() stepChange = new EventEmitter<number>();
  @Output() scrollToTopRequest = new EventEmitter<void>();



  increaseStep() {
    this.stepChange.emit(this.step + 1);
    this.scrollToTop();

    console.log(this.emailMatch)
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
  ngOnInit() {
    this.userInfo = this.fb.group({
      fname:this.fb.control(''),
      lname:this.fb.control(''),
      piece_identite:this.fb.control(''),
      numeroDePieceIdentite:this.fb.control(''),
      date_naissance:this.fb.control(''),
      addresse:this.fb.control(''),
      email:this.fb.control(''),
      phone:this.fb.control(''),
      numero_imm:this.fb.control(''),
      numero_patente:this.fb.control(''),
      file:this.fb.control(''),
      password:this.fb.control('')
    })
  }

  ngAfterViewInit(): void {
    if(this.userInfo.value.email!=this.emailConfirm){
      this.emailMatch=false
    }
    console.log(this.emailMatch)
  }


  save() {
    this.registerService.getInfoUserDetail(this.userInfo);
    this.loader=true;
    console.log("loader",this.loader)
    this.mergeData=this.fb.group({
      ...this.registerService.userProfile.controls,
      ...this.registerService.userDetail.controls
    })
    this.registerService.getAllData(this.mergeData);
    setTimeout(()=>{
      this.registerService.sendData(this.mergeData).subscribe((response)=>{
          console.log(response)
          this.agentCreated="your account has been created successfuly";
          this.isCreated=true;
          this.showToast=true;
          this.loader=false

        },

        (error)=>{
          console.log("error");
          this.isCreated=false;
          this.agentCreated="your account has not been created try again";
          this.showToast=true
          this.loader=false

        } )

    },8000)

  }
  dismiss() {
    this.showToast=false
  }

  password() {
    const pass = document.getElementById('password') as HTMLInputElement;
    if(pass.type=='text'){
      pass.type='password'
      this.passwordStatus=false;
    }else{
      pass.type='text';
      this.passwordStatus=true;
    }
  }

  fileSelected(event:any) {
    const files = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        console.log(file['name']);
        this.userInfo.get('file')?.setValue(file['name'])

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
      }
    }
  }
}
