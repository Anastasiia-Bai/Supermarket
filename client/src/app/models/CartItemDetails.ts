import { Product } from "./Product";

export class CartItemDetails {
    public constructor(
        public productId?: number,
        public cartId?: number,
        public amount?: number,
        public productName?: string,
        public generalPrice?: number,
        public image?: string,
        public price?: number
    ){}
}