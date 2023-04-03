import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
  constructor(path){
    this.products = [];
    this.path = path;
  }
  async #checkDB(){
    if(fs.existsSync(this.path)){
      this.products = JSON.parse(await fs.promises.readFile(this.path))
    }
  }
  async #updateDB(){
    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
  }
  async addProduct(title, description, price, thumbnail, code, stock){
    await this.#checkDB()
    const isInArray = this.products.some(product => product.code === code)
    if(isInArray === false && title && description && price && thumbnail && stock){
      this.products.push({
        id: uuidv4(),
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      });
      this.#updateDB
      return "Producto agregado"
    }else{
      return "Producto repetido o faltan características"
    }
  }
  async getProducts(){
    await this.#checkDB()
    return this.products
  }
  async getProductById(id){
    await this.#checkDB()
    const productFound = this.products.find(product => product.id === id)
    if (productFound){
      return productFound
    }else{
      return "Product not found"
    }
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock){
    await this.#checkDB()
    const indexFound = this.products.findIndex(product => product.id === id)
    if(indexFound !== -1){
      this.products[indexFound] = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      }
      await this.#updateDB()
      return "Producto actualizado"
    }else{
      return "Not found"
    }
  }
  async deleteProduct(id){
    await this.#checkDB()
    const indexFound = this.products.findIndex(product => product.id === id)
    if(indexFound !== -1){
      this.products.splice(indexFound,indexFound+1)
      await this.#updateDB()
      return "Producto eliminado"
    }else{
      return "Not found"
    }
  }
}
export const productManager = new ProductManager("./src/products.json");
console.log(productManager.addProduct("Malvón","Arbusto", 5, "Sin imagen1","abc1",40));
console.log(productManager.addProduct("Monstera deliciosa","Arbusto", 5, "Sin imagen2","abc2",40));
console.log(productManager.addProduct("Lavanda","Arbusto ", 5, "Sin imagen3","abc3",40));
console.log(productManager.addProduct("Manzano","Arbol", 20, "Sin imagen3","abc4",15));
console.log(productManager.addProduct("Naranjo","Arbol", 20, "Sin imagen3","abc5",15));
console.log(productManager.addProduct("Limonero","Arbol", 20, "Sin imagen3","abc6",15));
console.log(productManager.addProduct("Aylostera","Cactus", 5, "Sin imagen3","abc7",50));
console.log(productManager.addProduct("Browningia","Cactus", 5, "Sin imagen3","abc8",50));
console.log(productManager.addProduct("Cereus","Cactus", 5, "Sin imagen3","abc9",50));
console.log(productManager.addProduct("Hylocereus","Cactus", 5, "Sin imagen3","abc10",50));




