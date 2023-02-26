import { useStates } from "../utilities/states";
import randomCharacterFromString from '../utilities/random-order-confirmation';

export default function SeatForm() {
  
  
  const s = useStates('main', orderForm);

  let of = s.orderForm
}