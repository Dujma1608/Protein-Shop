import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ProductDetails() {
  const { productStore } = useStore();
  const {
    selectedProduct: product,
    openForm,
    cancelSelectedProduct,
  } = productStore;

  if (!product) return <LoadingComponent content="" />;
  return (
    <Card fluid>
      <Image src={`/assets/productImages/${product.image}.png`} />
      <Card.Content>
        <Card.Header>{product.title}</Card.Header>
        <Card.Meta>
          <span className="price">{product.price}€</span>
        </Card.Meta>
        <Card.Description>{product.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(product.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedProduct}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
