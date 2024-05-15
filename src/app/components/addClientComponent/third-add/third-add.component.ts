import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterClientService} from "../../../services/registerClient/register-client.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-third-add',
  templateUrl: './third-add.component.html',
  styleUrls: ['./third-add.component.css']
})
export class ThirdAddComponent implements OnInit{
  thirdAdd!:FormGroup;
  selectedFiles: any[] = [];
  mergeData!:FormGroup;
  createdClient:boolean=false;
  createdMessage:string="registration client has been successfully";
  loader:boolean=false;
  constructor(private fb:FormBuilder,private register:RegisterClientService,private http:HttpClient) {
  }
  ngOnInit(): void {
    this.thirdAdd=this.fb.group({
      file:[""],
    })
  }
  @Input() step: number = 3;
  @Output() stepChange = new EventEmitter<number>();
  @Output() scrollToTopRequest = new EventEmitter<void>();
  increaseStep() {
    if(this.step<3) {
      this.stepChange.emit(this.step + 1);
      this.scrollToTop();
    }
    this.register.getData3(this.thirdAdd);
    this.mergeData=this.fb.group({
      ...this.register.client1.controls,
      ...this.register.client2.controls,
      ...this.register.client3.controls
    })
    this.loader=true;
    this.register.getAllData(this.mergeData);
    setTimeout(()=>{
      this.register.sendData(this.mergeData).subscribe(
        (response)=>{
           this.loader=false;
           this.createdClient=true;
           setTimeout(()=>{
             this.createdMessage="";
             this.createdClient=false;
           },3000)
        },(error)=>{
         console.log(error)
        }
      )
    },3000)

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

  selectedFile(event: any) {
    const files = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        console.log(file['name']);
        this.thirdAdd.get('file')?.setValue(file['name'])

        const format = new FormData();
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
