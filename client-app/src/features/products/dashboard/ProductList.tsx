import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ProductList() {
  const { productStore } = useStore();
  const { deleteProduct, products, loading } = productStore;
  const [target, setTarget] = useState("");

  function handleProductDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteProduct(id);
  }
  return (
    <Segment>
      <Item.Group link divided>
        {products.map((product) => (
          <Item key={product.id}>
            <Item.Content>
              <Item.Image></Item.Image>
              <Item.Header as="a">{product.title}</Item.Header>
              <Item.Description>{product.description}</Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => productStore.selectProduct(product.id)}
                  floated="right"
                  content="Detail"
                  color="blue"
                />
                <Button
                  name={product.id}
                  loading={loading && target === product.id}
                  onClick={(e) => handleProductDelete(e, product.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={product.price + "€"} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
