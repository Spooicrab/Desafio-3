import fs from "fs";

class GestorProductos {
    constructor(path) {
        this.path = path;
    }

    async getProducts(Query) {
        const { limit } = Query;
        try {
            const productsFile = await fs.promises.readFile(this.path, "utf-8");
            const productsArray = JSON.parse(productsFile);
            return fs.existsSync(this.path) ? (limit ? productsArray.slice(0, limit) : productsArray) : [];
        }
        catch (error) {
            return error;
        }
    }

    async addProducts(title, description, price, thumbnail, code, stock) {
        try {
            let productos = await this.getProducts();
            const producto = {
                id: productos.length ? productos[productos.length - 1].id + 1 : 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            productos.push(producto);
            await fs.promises.writeFile(this.path, JSON.stringify(productos));
        } catch (error) {
            return error;
        }
    }

    async getProductbyID(ID) {
        try {
            const Productos = await this.getProducts({});
            const producto = Productos.find((p) => p.id === +ID);
            return producto ? producto : "no encontrado";
        } catch (error) {
            return error;
        }
    }

    async updateProduct(
        ID,
        newtitle,
        newdescription,
        newprice,
        newthumbnail,
        newcode,
        newstock
    ) {
        try {
            let Productos = await this.getProducts(); //
            Productos = Productos.map((producto) => {
                if (producto.id === ID) {
                    producto.title = newtitle || producto.title;
                    producto.description = newdescription || producto.description;
                    producto.price = newprice || producto.price;
                    producto.thumbnail = newthumbnail || producto.thumbnail;
                    producto.code = newcode || producto.code;
                    producto.stock = newstock || producto.stock;
                }
                return producto;
            });
            await fs.promises.writeFile(this.path, JSON.stringify(Productos));
            console.log("¡Producto actualizado!");
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(ID) {
        try {
            const Lista = await this.getProducts();
            const NuevaLista = Lista.filter((p) => p.id !== ID);
            await fs.promises.writeFile(this.path, JSON.stringify(NuevaLista));
        } catch (error) {
            return error;
        }
    }

}

// async function test() {
//     const ListaProductos = new GestorProductos("Productos.json");
//     let busqueda = await ListaProductos.getProductbyID(3)
//    console.log(busqueda)
// }
// test()


export const ProductManager = new GestorProductos("Productos.json");
