interface VinoshipperInstance {
  init(accountId: number, config?: VinoshipperConfig): void;
  cartOpen(): void;
  cartClose(): void;
  render(): void;
}

interface VinoshipperConfig {
  theme?: string | null;
  cartPosition?: "start" | "end";
  cartButton?: boolean;
  addToCartStyle?: boolean;
  autoRender?: boolean;
  debug?: boolean;
}

declare global {
  interface Window {
    Vinoshipper: VinoshipperInstance;
  }
}

export {};
