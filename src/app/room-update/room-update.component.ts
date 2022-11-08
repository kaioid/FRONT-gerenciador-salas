import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.css']
})
export class RoomUpdateComponent implements OnInit {

  id!: number;
  room!: Room;
  submitted = false;

  constructor(private route: ActivatedRoute, private router: Router, private roomService: RoomService) { }

  ngOnInit() {
    this.room = new Room();
    this.id = this.route.snapshot.params['id'];
    this.roomService.getRoom(this.id).subscribe(data =>{
      console.log(data);
      this.room = data;
    },
    error => console.log(error));
  }

  roomUpdate() {
    this.roomService.roomUpdate(this.id, this.room)
      .subscribe(data => console.log(data), error => console.log(error));
    this.room = new Room();
    this.gotoList();
  }

  onSubmit(){
    this.roomUpdate();
  }

  gotoList(){
    this.router.navigate(['/rooms'])
  }

}
