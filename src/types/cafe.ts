export interface CustomizationSize {
  name: string;
  priceDelta: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export type CategoryId = 'todos' | 'cafeteria' | 'dulces' | 'rolls-budines' | 'salados' | 'combos';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: CategoryId;
  price: number;
  description: string;
  image: string;
  badges: string[];
  dietary: string[];
  sizes?: CustomizationSize[];
  milkOptions?: string[];
  extras?: CustomizationOption[];
  origin?: string;
  prepTime?: string;
  isPopular?: boolean;
}

export interface CartItemOptionSelection {
  size?: CustomizationSize;
  milk?: string;
  extras?: CustomizationOption[];
  notes?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  options: CartItemOptionSelection;
  itemTotalPrice: number;
}

export type OrderType = 'takeaway' | 'dinein' | 'delivery';

export type UserRole = 'customer' | 'shift_manager' | 'admin';

export interface UserSession {
  role: UserRole;
  name: string;
  isAuthenticated: boolean;
  loginTime?: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  giftPackaging: boolean;
  giftPackagingPrice: number;
  total: number;
  orderType: OrderType;
  tableNumber?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  estimatedTime: string;
  timestamp: string;
  status: 'confirmed' | 'preparing' | 'ready';
}

