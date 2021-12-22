export class Product{
    public constructor(
        public productId?: number,
        public productName?: string,
        public price?: number,
        public category?: string,
        public image?: string,
        public amount?: number,
        public categoryId?: number
    ){}
}