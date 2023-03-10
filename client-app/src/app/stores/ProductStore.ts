import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Product } from "../models/product";
import { v4 as uuid } from "uuid";

export default class ProductStore {
  productRegistry = new Map<string, Product>();
  selectedProduct: Product | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get products(){
    return Array.from(this.productRegistry.values());
  }
  loadProducts = async () => {
    try {
      const products = await agent.Products.list();
      runInAction(() => {
        products.forEach((product) => {
          this.productRegistry.set(product.id, product);
        });
        this.setLoadingInitial(false);
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      })
    }
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectProduct = (id: string) => {
    this.selectedProduct = this.productRegistry.get(id);
  };

  cancelSelectedProduct = () => {
    this.selectedProduct = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectProduct(id) : this.cancelSelectedProduct();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createProduct = async (product: Product) => {
    this.loading = true;
    product.id = uuid();
    try {
      await agent.Products.create(product);
      runInAction(() => {
        this.productRegistry.set(product.id, product);
        this.selectedProduct = product;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateProduct = async (product: Product) => {
    this.loading = true;
    try {
      await agent.Products.update(product);
      runInAction(() => {
        this.productRegistry.set(product.id, product);
        this.selectedProduct = product;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteProduct = async (id: string) => {
    this.loading = true;
    try {
      await agent.Products.delete(id);
      runInAction(() => {
        this.productRegistry.delete(id);
        if (this.selectedProduct?.id === id) this.cancelSelectedProduct();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
