import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntreService } from '../../service/entre.service';
import { Entre } from '../../model/entre';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';


@Component({
  selector: 'app-list-entre',
  templateUrl: './list-entre.component.html',
  styleUrls: ['./list-entre.component.scss']
})
export class ListEntreComponent {
  p: number =1;
  entreListe:any;
  SearchText :string;
  constructor( private service :EntreService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
    
    this.refreshListe();
    
  }
refreshListe(){
  this.service.getAll().subscribe(
    response =>{this.entreListe = response;}
   );

}


  onDelete(id: number) {
   
    if (window.confirm('Are sure you want to delete this Article ?')) {
      this.service.deleteAll(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' data successfully deleted!'); 
            this.refreshListe();
          },
          error => console.log(error));
    }
  }
newComm()
  {
    this.service.choixmenu ="A"
  this.router.navigate(['/home/entre']);
  }

onSelect(item :Entre){
  
  this.service.formData = this.fb.group(Object.assign({},item));
  this.service.choixmenu ="M"
  this.router.navigate(['/home/entre']);
}
transformDate(date:any){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}
}

