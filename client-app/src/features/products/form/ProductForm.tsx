import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer (function ProductForm() {

  const {productStore} = useStore();
  const {selectedProduct, closeForm, createProduct, updateProduct, loading} = productStore;
  


    const initialState = selectedProduct ?? {
        id: '',
        title: '',
        description: '',
        image: '',
        price: 0,
    };


    const [product, setProduct] = useState(initialState);

    function handleSubmit(){
        product.id ? updateProduct(product) : createProduct(product);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setProduct({...product, [name]: value});
    }

    return (
      <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Input
            placeholder="Title"
            value={product.title}
            name="title"
            onChange={handleInputChange}
          />
          <Form.Input
            placeholder="Description"
            value={product.description}
            name="description"
            onChange={handleInputChange}
          />
          <Form.Input
            placeholder="Image"
            value={product.image}
            name="image"
            onChange={handleInputChange}
          />
          <Form.Input
            type="number"
            placeholder="Price"
            value={product.price}
            name="price"
            onChange={handleInputChange}
          />
          <Button
            loading={loading}
            floated="right"
            positive
            type="submit"
            content="Submit"
          />
          <Button
            onClick={closeForm}
            floated="right"
            type="button"
            content="Cancel"
          />
        </Form>
      </Segment>
    );
})