import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const { productStore } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/P logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Proteinity Shop
        </Menu.Item>
        <Menu.Item name="Products" />
        <Menu.Item>
          <Button
            onClick={() => productStore.openForm()}
            positive
            content="Create product"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
});
