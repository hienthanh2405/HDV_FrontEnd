export class ProductStorage {
    id: string;
    productId: string;
    storageId: string;
    inventory: number;
    constructor() {
        this.id = '';
        this.productId = '';
        this.storageId = '';
        this.inventory = 0;
    }
    setProductStorage(id: string, productId: string, storageId: string, inventory: number) {
        this.id = id;
        this.productId = productId;
        this.storageId = storageId;
        this.inventory = inventory;
    }

}
