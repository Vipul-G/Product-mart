import Product from '../../types/product'

export interface CartProduct {
  product: Product;
  quantity: number;
}

export class Cart {

  private cartProds: CartProduct[] = []
  loading: Boolean = false
  error: string = ''

  constructor(cartProds: CartProduct[], loading: Boolean, error: string) {
    this.cartProds = [...cartProds]
    this.loading = loading
    this.error = error
  }

  get cartProducts(): CartProduct[] {
    return this.cartProds
  }

  get products() {
    return this.cartProds.reverse()
  }

  private findIndex(id: number): number {
    return this.cartProds.findIndex((cp) => cp.product.id === id)
  }

  addProduct(p: Product) {
    const index = this.findIndex(p.id)
    if (index === -1) {
      this.cartProds.push({ product: p, quantity: 1 })
      return
    }
    this.updateCount(p.id, 1, index)
  }

  getProduct(id: number) {
    return this.cartProds.find((cp) => cp.product.id === id)
  }

  removeProduct(id: number) {
    this.cartProds = this.cartProds.filter((cp) => cp.product.id !== id)
  }

  updateCount(id: number, count, i) {
    let index;
    if (i == -1) {
      index = this.findIndex(id)
    } else {
      index = i
    }
    const temp: CartProduct =
    {...this.cartProds[index], quantity: this.cartProds[index].quantity + count}
    this.cartProds = [...this.cartProds.fill(temp, index, index + 1)]
  }

}
