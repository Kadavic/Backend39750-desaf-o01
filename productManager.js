import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
  constructor(path){
    this.products = [];
    this.path = path;
  }
  #checkDB(){
    if(fs.existsSync(this.path)){
      this.products = JSON.parse(fs.readFileSync(this.path))
    }
  }
  addProduct(title, description, price, thumbnail, code, stock){
    this.#checkDB()
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
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "Added product"
    }else{
      return "Repeated product"
    }
  }
  getProducts(){
    return this.products
  }
  getProductById(id){
    this.#checkDB()
    const productFound = this.products.find(product => product.id === id)
    if (productFound){
      return productFound
    }else{
      return "Not found"
    }
  }
  updateProduct(id, title, description, price, thumbnail, code, stock){
    this.#checkDB()
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
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "Updated product"
    }else{
      return "Not found"
    }
  }
  deleteProduct(id){
    this.#checkDB()
    const indexFound = this.products.findIndex(product => product.id === id)
    if(indexFound !== -1){
      this.products.splice(indexFound,indexFound+1)
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "Removed product"
    }else{
      return "Not found"
    }
  }
}
const productManager = new ProductManager("./products.json");
console.log('products: ',productManager.getProducts());
console.log(productManager.addProduct("producto prueba1","Este es un producto prueba1", 200, "Sin imagen1","abc123",25));
console.log(productManager.addProduct("producto prueba2","Este es un producto prueba2", 200, "Sin imagen2","abc12",25));
console.log(productManager.addProduct("producto prueba3","Este es un producto prueba3", 200, "Sin imagen3","abc1",25));
console.log('products: ',productManager.getProducts());
console.log(productManager.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen","abc123",25));
console.log('Product added by Id: ',productManager.getProductById("e1f0d255-809a-498c-8eda-bd47a4727cfd"));
console.log('Product added by Id: ',productManager.getProductById("013d0de7-4742-4e2d-860a-86de0697b61e"));
console.log(productManager.updateProduct("651437ea-523f-4bf2-9929-fe9837ca653e","producto prueba1 actualizado","Este es un producto prueba1 actualizado",300,"Sin imagen1 actualizado", "abc321",25))
console.log(productManager.deleteProduct("013d0de7-4742-4e2d-860a-86de0697b61e"))
console.log('products: ',productManager.getProducts());