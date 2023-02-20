import { useStates } from "../utilities/states";
import orderConfirmGenerate from './utilities/random-order-confirmation';

export default function BookingForm() {
  orderForm = {
    email: '',
    phoneNumber: '',
    numberOfAdults: 0,
    numberOfSeniors: 0,
    numberOfChildren: 0,
    submitted: false,
    error: null
  }
  
  const s = useStates('main', orderForm);

  let of = s.orderForm
}