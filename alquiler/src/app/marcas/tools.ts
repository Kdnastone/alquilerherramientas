export class Tools {
    toolId: number;
    toolName: string;
    alquilerPorHora: number;
    alquilerPorDia: number;
    imagenHerramienta: string;

    constructor() {
        this.toolId = 0;
        this.toolName = '';
        this.imagenHerramienta = '';
        this.alquilerPorHora = 0;
        this.alquilerPorDia = 0;  
    }
}

export class Booking{
    bookingId: number;
    clientName: string;
    clientMobile: number;
    toolId: number;
    toolName: string;
    clientBookingDate: Date;
    clientRentType: string;
    clientRentDuration: number;
    clientNumberOfTools: number;
  id: any;

    constructor() {
        this.bookingId = 0;
        this.clientName = '';
        this.clientMobile = 0;
        this.toolId = 0;
        this.toolName = '';
        this.clientBookingDate = new Date();
        this.clientRentType = '';
        this.clientRentDuration = 0;
        this.clientNumberOfTools = 0;        
    }
}