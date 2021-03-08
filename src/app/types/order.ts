export default interface Order {
  order_id: number;
  payment_id: number;
  order_time: string;
  estimate_delivery: string;
  amount: number;
  payment_mode: string;
  payment_status: boolean;
}
