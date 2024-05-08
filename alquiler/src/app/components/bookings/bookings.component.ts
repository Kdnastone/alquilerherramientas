import { Component, OnInit } from '@angular/core';
import { Booking, Tools } from '../../marcas/tools';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
onEditField(arg0: string,arg1: any,_t27: number) {
throw new Error('Method not implemented.');
}
  localKeyName: string = 'rentalTools';
  isSidePanelVisible: boolean = false;
  toolList: Tools[] = [];
  bookingObj: Booking = new Booking();
  bookingList: Booking[] = [];
  editingBooking: any = {};

  ngOnInit(): void {
    const localData = localStorage.getItem('rentalTools');
    if (localData != null) {
      this.toolList = JSON.parse(localData);
    }
    const localBookingData = localStorage.getItem('rentalBooking');
    if (localBookingData != null) {
      this.bookingList = JSON.parse(localBookingData);
    }
    this.assignToolNamesToBookings();
  }

  toggleSidePanel() {
    this.isSidePanelVisible = !this.isSidePanelVisible;
  }

  onSaveBooking() {
    if (this.editingBooking && this.editingBooking.id) {
      const index = this.bookingList.findIndex(booking => booking.bookingId === this.editingBooking.bookingId);
      if (index !== -1) {
        this.bookingList[index] = { ...this.editingBooking };
        localStorage.setItem('rentalBooking', JSON.stringify(this.bookingList));
        this.editingBooking = {};         
      }
    } else {
      if (this.bookingObj.clientName !== '') {
        const selectedTool = this.toolList.find(tool => tool.toolId === this.bookingObj.toolId);
        if (selectedTool) {
          this.bookingObj.toolName = selectedTool.toolName;
          this.bookingList.unshift(this.bookingObj);
          localStorage.setItem('rentalBooking', JSON.stringify(this.bookingList));
          this.bookingObj = new Booking(); 
        } else {
          console.error('No se encontró la herramienta correspondiente.');
        }
      }
    }
  }

  onResetBooking() {
    this.bookingObj = new Booking();
  }

  onDeleteBooking(index: number) {
    this.bookingList.splice(index, 1);
    localStorage.setItem('rentalBooking', JSON.stringify(this.bookingList));
  }

  assignToolNamesToBookings() {
    this.bookingList.forEach(booking => {
      const tool = this.toolList.find(tool => tool.toolId === booking.toolId);
      if (tool) {
        booking.toolName = tool.toolName;
      }
    });
  }

  onEditBooking(bookingId: number) {
    const index = this.bookingList.findIndex(booking => booking.bookingId === bookingId);
    if (index !== -1) {
        this.editingBooking = { ...this.bookingList[index] };
        this.isSidePanelVisible = true;
    }
}

onSaveChanges() {
  const index = this.bookingList.findIndex(booking => booking.bookingId === this.editingBooking.bookingId);
  if (index !== -1) {
      this.bookingList[index] = { ...this.editingBooking };
      localStorage.setItem('rentalBooking', JSON.stringify(this.bookingList));
      this.editingBooking = {};
      this.isSidePanelVisible = false;
  }
}

  onCancelEdit() {
    this.editingBooking = {};
    this.isSidePanelVisible = false;
  }

}
