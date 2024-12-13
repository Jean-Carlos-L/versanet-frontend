export interface Invoice {
  id: string;
  idCliente: string;
  fecha_facturacion: Date;
  monto_total: number;
  estado: number;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}

export interface InvoiceCreate {
  idCliente: string;
  fecha_facturacion: Date;
  monto_total: number;
  estado: number;
}
