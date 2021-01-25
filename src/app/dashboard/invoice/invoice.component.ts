import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from '../../lib/services/auth.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  public invoiceId : string

  constructor(private authService : AuthService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.invoiceId = param.id;
      this.monthlyExpanse(this.invoiceId)

    })

  }

  monthlyExpanse(id){
    this.authService.monthlyExpanse(id).subscribe(data =>{
    })
  }


  exportAsPDF(MyDIv){

    var data = document.getElementById('MyDIv');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }

}
