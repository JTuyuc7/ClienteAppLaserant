import axios from 'axios';

// This is just for the bootcamp URL should be changed
// Get all the products
async function all(){
    try {
        const response = await axios.get('http://localhost:5001/productos');
        return response.data;
    } catch (error) {
        console.log('Unable to get the items', error)
    }
}

// Post a new product
async function newProduct(product){
    try {
        const productAdded = await axios.post('http://localhost:5001/productos', product )
        return productAdded.data
    } catch (error) {
        console.log('Unable to save the dish', error)
    }
}

// Get an especific product
async function getProduct(id){
    try {
        const productFind = await axios.get(`http://localhost:5001/productos/${id}`);
        return productFind.data;
    } catch (error) {
        console.log('Unable to get the especific product', error)
    }
}

// Put or Edit a product
async function editProduct(product){
    try {
        const edited = await axios.put(`http://localhost:5001/productos/${product.id}`, product);
        return edited.data
    } catch (error) {
        console.log('Unable to Edit the product', error)
    }
}

// Delete a product
async function deleteProducto(id){
    try {
        await axios.delete(`http://localhost:5001/productos/${id}`)
    } catch (error) {
        console.log('Unable to delete the product', error)
    }
}

export default { 
    all, 
    newProduct,
    getProduct,
    editProduct,
    deleteProducto
};