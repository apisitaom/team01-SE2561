import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service/service.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dialog-send-coffee',
  templateUrl: './dialog-send-coffee.component.html',
  styleUrls: ['./dialog-send-coffee.component.css']
})
export class DialogSendCoffeeComponent implements OnInit {

  public API = '//localhost:8080';

  constructor(public  httpClient: HttpClient, public  serviceService: ServiceService, public  http: HttpClient,) { }

  public  delivery = {
    coffeeDeliveryId : Number,
    price : Number,
    name : String,
    latitude : Number,
    longitude : Number,
  };

  public member = {
    meid : '',
    nameM : String,
    tel : '',
    email : '',
    address : '',
    province : '',
    sex : '',

  };

  public staffNames = {
    id : '',
    staffName : String,
  };
  public staffNameSelect = 0;

  public status = {
    statusId : '',
    statusName : String,
  };
  public statusSelect = 0;





  getDelivery(): Observable<any> {
    return this.http.get(this.API + '/CoffeeDelivery/' + this.serviceService.coffeeId);
  }

  getMember(): Observable<any> {
    return this.http.get(this.API + '/member');
  }

  getStaff(): Observable<any> {
    return this.http.get(this.API + '/staff');
  }

  getStatus(): Observable<any> {
    return this.http.get(this.API + '/Status');
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  Send() {
    // this.note = this.serviceService.coffeeId  - this.serviceService.deleteCounter - 1;

    if (this.statusSelect === 0 || this.staffNameSelect === 0) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน  >>> คุณยังไม่เลือกสถานะ หรือ ชื่่อพนักงาน');

    } else {
      this.httpClient.post('http://localhost:8080/Delivery' + '/' + this.serviceService.coffeeId  + '/'
        + this.delivery.name + '/'
        + this.delivery.price + '/'
        + this.delivery.latitude + '/' + this.delivery.longitude + '/'
        + this.staffNameSelect + '/' + this.status[this.statusSelect - 1].statusName + '/' + this.staffNameSelect + '/'
        + this.staffNames[this.staffNameSelect - 1].staffName , this.delivery)
        .subscribe(
          data => {
            console.log('POST Request is successful>>>>>>>>>>', data);
          },
          error => {
            console.log('Error!!!!!!!!!!!', error);
          }
        );

      alert('<<< บันทึกสำเร็จ! >>>');

      // this.http.delete(this.API + '/CoffeeDelivery' +  '/' + this.serviceService.coffeeId).subscribe(
      //   data => {
      //     console.log(' Delete is successful>>>>>>>>>>>>', data);
      //   },
      //   error => {
      //     console.log('Error!!!!!!!!!!!', error);
      //   }
      // );

     // window.location.reload();

    }
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ngOnInit() {

    this.getDelivery().subscribe(data => {
      this.delivery = data;
      console.log(this.delivery);
    });

    this.getMember().subscribe(data => {
      this.member = data;
      console.log(this.member);
    });

    this.getStaff().subscribe(data => {
      this.staffNames = data;
      console.log(this.staffNames);
    });

    this.getStatus().subscribe(data => {
      this.status = data;
      console.log(this.status);
    });



  }



}
