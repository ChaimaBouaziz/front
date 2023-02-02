import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InventaireService } from '../../service/inventaire.service';
import { Inventaire } from '../../model/inventaire';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-list-inventaire',
  templateUrl: './list-inventaire.component.html',
  styleUrls: ['./list-inventaire.component.scss']
})
export class ListInventaireComponent {


  
    p: number =1;
    inventaireListe:any;
    SearchText :string;
    constructor( private service :InventaireService,private router:Router,
      private toastr :ToastrService,public fb: FormBuilder,
      private datePipe : DatePipe) { }
  
    ngOnInit() {
      
      this.refreshListe();
      
    }
  refreshListe(){
    this.service.getAll().subscribe(
      response =>{this.inventaireListe = response;}
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
    this.router.navigate(['/home/inventaire']);
    }
  
    onSelect(item :Inventaire){
    
      this.service.formData = this.fb.group(Object.assign({},item));
      this.service.formData.patchValue({
        date: this.transformDate(item.dateInventaire)
      });
      this.service.choixmenu ="M"
      this.router.navigate(['/home/inventaire']);
    }
    
    transformDate(date: any) {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
  }