export interface ActiveBookLoanDto {
  id: number;
  userId: number;
  isReservation: boolean;
  reservationDate: Date;
  loanDate: Date;
  returnDate: Date;
}