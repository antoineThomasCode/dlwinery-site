interface VinoshipperConfig {
  theme?: string | null;
  debug?: boolean;
  skipAnalytics?: boolean;
  autoRender?: boolean;
  tooltips?: boolean;
  cartPosition?: "start" | "end";
  cartButton?: boolean;
  cartUrlParams?: Promise<unknown>;
  addToCartStyle?: boolean;
  productCatalogStyle?: boolean;
  productCatalogAnnouncement?: boolean;
  productCatalogAvailable?: boolean;
  announcementStyle?: boolean;
  availableInTooltips?: boolean;
}

interface VinoshipperInstance {
  init(accountId: number, config?: VinoshipperConfig): Promise<void>;
  render(): Promise<void>;
  isLoaded(): boolean;
  isRendered(): boolean;
  isDebug(): boolean;
  getId(): number | null;
  getServer(includeProtocol?: boolean): string | undefined;
  getCart(): unknown;
  getCartCheckout(): URL;
  getLinkParams(url: URL): Promise<URL>;
  cartOpen(): void;
  cartClose(): void;
  getTheme(withPrefix?: boolean): string | null;
  isThemeDark(): boolean;
  onProductAdd(productId: number, qty?: number, options?: { update?: boolean }): Promise<void>;
  onProductAddFormSubmit(event: SubmitEvent): Promise<void | Error>;
  clubRegistrationClubSet(clubId: number, domId?: string): void;
}

declare global {
  interface Window {
    Vinoshipper: VinoshipperInstance;
  }
}

export {};
