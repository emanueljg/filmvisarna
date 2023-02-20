import { useStates } from "../utilities/states";
import randomCharacterFromString from '../utilities/random-order-confirmation';

export default function PaymentForm() {
  orderForm = {
    email: "",
    phone: "",
    debit_card: "",
    submitted: false,
    error: null
  }

  const s = useStates('main', orderForm);

  let of = s.orderForm
}