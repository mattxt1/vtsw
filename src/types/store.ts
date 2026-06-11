export interface StoreOption {
  id: string;
  label: string;
  detail?: string;
  priceDelta: number;
  color?: string;
}

export interface StoreOptionGroup {
  id: string;
  label: string;
  description?: string;
  mode: "single" | "multiple";
  options: StoreOption[];
}

export interface StoreProductConfiguration {
  productKey: string;
  basePrice: number;
  purchasable: boolean;
  purchaseNote?: string;
  optionGroups: StoreOptionGroup[];
  protectOptions: StoreOption[];
}

export interface CartSelection {
  groupId: string;
  groupLabel: string;
  optionId: string;
  optionLabel: string;
  priceDelta: number;
  color?: string;
}

export interface CartItem {
  id: string;
  productKey: string;
  productName: string;
  productRoute: string;
  selections: CartSelection[];
  unitPrice: number;
  quantity: number;
}
