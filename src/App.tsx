import React, { useState, useMemo, useEffect } from 'react';
import { MENU_PRODUCTS } from './data/menu';
import { Product, CartItem, OrderType, OrderDetails, CustomizationSize, CustomizationOption, CategoryId, UserRole } from './types/cafe';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { SearchBarAndFilters } from './components/SearchBarAndFilters';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { PriceManagerModal } from './components/PriceManagerModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { PrivacyPoliciesModal } from './components/PrivacyPoliciesModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { StoreInfoModal } from './components/StoreInfoModal';
import { Footer } from './components/Footer';
import { Sparkles, Heart, Coffee, Smile, Tag, ShieldCheck } from 'lucide-react';

export default function App() {
  // Roles & Security states
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState<boolean>(false);
  const [isPrivacyPoliciesOpen, setIsPrivacyPoliciesOpen] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<string>('Mesa 1');
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('ciccio_admin_pass') || '1234';
    } catch {
      return '1234';
    }
  });

  const handleChangeAdminPassword = (newPass: string) => {
    setAdminPassword(newPass);
    try {
      localStorage.setItem('ciccio_admin_pass', newPass);
    } catch {
      // ignore
    }
    showToast('Nueva clave de Administrador guardada');
  };
  // Products state with local storage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ciccio_caffe_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return MENU_PRODUCTS;
  });

  // Navigation & Category states
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const [popularOnly, setPopularOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ciccio_caffe_favs');
      return saved ? JSON.parse(saved) : ['latte-swan-art', 'croissant-frutillas-chantilly', 'toston-huevos-bacon'];
    } catch {
      return ['latte-swan-art', 'croissant-frutillas-chantilly', 'toston-huevos-bacon'];
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ciccio_caffe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderType, setOrderType] = useState<OrderType>('takeaway');

  // Modal states
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isStoreInfoOpen, setIsStoreInfoOpen] = useState<boolean>(false);
  const [isPriceManagerOpen, setIsPriceManagerOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Mobile preview mode toggle
  const [isMobilePreview, setIsMobilePreview] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('ciccio_caffe_favs', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('ciccio_caffe_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Toggle favorite
  const handleToggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
      showToast('Eliminado de favoritos');
    } else {
      setFavorites([...favorites, productId]);
      showToast('¡Agregado a tus favoritos! 💛');
    }
  };

  // Add to cart from modal
  const handleAddToCart = (
    product: Product,
    quantity: number,
    options: {
      size?: CustomizationSize;
      milk?: string;
      extras?: CustomizationOption[];
      notes?: string;
    }
  ) => {
    const basePrice = product.price;
    const sizeDelta = options.size ? options.size.priceDelta : 0;
    const extrasDelta = options.extras
      ? options.extras.reduce((sum, e) => sum + e.price, 0)
      : 0;
    const itemTotalPrice = (basePrice + sizeDelta + extrasDelta) * quantity;

    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product,
      quantity,
      options,
      itemTotalPrice,
    };

    setCart((prev) => [...prev, newItem]);
    showToast(`✓ ${quantity}x ${product.name} agregado al pedido 🥐`);
  };

  // Quick add default
  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes ? product.sizes[0] : undefined;
    const defaultMilk = product.milkOptions ? product.milkOptions[0] : undefined;
    const itemTotalPrice = product.price + (defaultSize ? defaultSize.priceDelta : 0);

    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity: 1,
      options: {
        size: defaultSize,
        milk: defaultMilk,
      },
      itemTotalPrice,
    };

    setCart((prev) => [...prev, newItem]);
    showToast(`✓ ${product.name} agregado ☕`);
  };

  // Cart operations
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const unitPrice = item.itemTotalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotalPrice: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Producto eliminado del pedido');
  };

  const handleConfirmOrder = (orderDetails: OrderDetails) => {
    setConfirmedOrder(orderDetails);
    setCart([]);
    setIsCartOpen(false);
  };

  // Price Manager & Product Updates
  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    try {
      localStorage.setItem('ciccio_caffe_products', JSON.stringify(updatedProducts));
    } catch {
      // ignore
    }
    // Update active cart item pricing if changed
    setCart((prevCart) =>
      prevCart.map((item) => {
        const found = updatedProducts.find((p) => p.id === item.product.id);
        if (!found) return item;
        const sizeDelta = item.options.size ? item.options.size.priceDelta : 0;
        const extrasDelta = item.options.extras
          ? item.options.extras.reduce((sum, e) => sum + e.price, 0)
          : 0;
        return {
          ...item,
          product: found,
          itemTotalPrice: (found.price + sizeDelta + extrasDelta) * item.quantity,
        };
      })
    );
    showToast('¡Precios actualizados y guardados con éxito! 🏷️');
  };

  const handleResetDefaults = () => {
    setProducts(MENU_PRODUCTS);
    try {
      localStorage.removeItem('ciccio_caffe_products');
    } catch {
      // ignore
    }
    showToast('Precios restaurados a los valores sugeridos');
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'todos' && product.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSubtitle = product.subtitle?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSubtitle) {
          return false;
        }
      }

      // Dietary filter
      if (selectedDietary.length > 0) {
        const matchesAllDietary = selectedDietary.every((tag) =>
          product.dietary.includes(tag) || product.badges.includes(tag)
        );
        if (!matchesAllDietary) return false;
      }

      // Favorites only
      if (showOnlyFavorites && !favorites.includes(product.id)) {
        return false;
      }

      // Popular only
      if (popularOnly && !product.isPopular) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, selectedDietary, showOnlyFavorites, popularOnly, sortBy, favorites]);

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.itemTotalPrice, 0);

  return (
    <div className="min-h-screen bg-[#FBF3E8] text-[#2C1D1A] flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2C1D1A] text-[#FBF3E8] px-5 py-3 rounded-full shadow-2xl border border-[#D99443]/60 text-xs font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#D99443]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Layout */}
      <div className={`w-full transition-all duration-300 ${isMobilePreview ? 'py-4 sm:py-8 bg-[#EFE4D4]' : ''}`}>
        <div
          className={`mx-auto bg-[#FBF3E8] transition-all duration-300 flex flex-col ${
            isMobilePreview
              ? 'max-w-[410px] min-h-[844px] rounded-[44px] shadow-2xl border-[10px] border-[#2C1D1A] overflow-hidden relative'
              : 'max-w-6xl'
          }`}
        >
          {/* Mobile Bezel Header Bar if in simulator mode */}
          {isMobilePreview && (
            <div className="bg-[#2C1D1A] text-[#FBF3E8] px-6 py-2 flex items-center justify-between text-[11px] font-bold tracking-tight">
              <span>09:41</span>
              <div className="w-24 h-4 bg-black rounded-full mx-auto" />
              <span>5G · 100% ☕</span>
            </div>
          )}

          {/* Navigation Bar */}
          <Header
            favoritesCount={favorites.length}
            cartCount={cartCount}
            cartTotal={cartTotal}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenFavorites={() => setShowOnlyFavorites((prev) => !prev)}
            onOpenStoreInfo={() => setIsStoreInfoOpen(true)}
            onOpenPriceManager={() => setIsPriceManagerOpen(true)}
            onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
            currentRole={currentRole}
            isMobilePreview={isMobilePreview}
            onToggleMobilePreview={() => setIsMobilePreview(!isMobilePreview)}
          />

          {/* Main Content Area */}
          <main className="flex-1 px-4 sm:px-6 py-5 sm:py-6" id="menu-sezione">
            {/* Hero Section */}
            <HeroBanner
              orderType={orderType}
              onChangeOrderType={setOrderType}
              selectedTable={selectedTable}
              onSelectTable={setSelectedTable}
              onExploreMenu={() => {
                const el = document.getElementById('catalogo-prodotti');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenStoreStory={() => setIsStoreInfoOpen(true)}
            />

            {/* Catalog */}
            <div id="catalogo-prodotti" className="pt-2">
              {/* Category Segmented Navigation */}
              <CategoryNav
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />

              {/* Search Bar & Filters */}
              <SearchBarAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedDietary={selectedDietary}
                onToggleDietary={(tag) =>
                  setSelectedDietary((prev) =>
                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                  )
                }
                showOnlyFavorites={showOnlyFavorites}
                onToggleFavorites={() => setShowOnlyFavorites(!showOnlyFavorites)}
                sortBy={sortBy}
                onSortChange={setSortBy}
                popularOnly={popularOnly}
                onTogglePopularOnly={() => setPopularOnly(!popularOnly)}
              />

              {/* Section Title & Counter */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E8DCC8]">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#2C1D1A] tracking-tight">
                    {selectedCategory === 'todos'
                      ? 'Nuestra Carta Completa'
                      : selectedCategory === 'cafeteria'
                      ? 'Cafetería de Especialidad'
                      : selectedCategory === 'dulces'
                      ? 'Croissants & Pastelería'
                      : selectedCategory === 'rolls-budines'
                      ? 'Rolls & Budines Artesanales'
                      : selectedCategory === 'salados'
                      ? 'Tostones & Especialidades Saladas'
                      : 'Combos & Promociones'}
                  </h2>
                  <span className="text-xs text-[#7D6858] font-bold font-mono tabular-nums bg-[#F5EBE1] px-2.5 py-0.5 rounded-full border border-[#E8DCC8]">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                  </span>
                </div>

                {showOnlyFavorites && (
                  <span className="text-xs text-[#C05C38] font-extrabold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#C05C38]" />
                    <span>Favoritos</span>
                  </span>
                )}
              </div>

              {/* Product Grid: 2-column mobile-first grid, expanding to 3 and 4 on tablets/desktops */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#E8DCC8] space-y-3 shadow-sm">
                  <Coffee className="w-10 h-10 mx-auto text-[#C05C38]" />
                  <h3 className="text-base font-extrabold text-[#2C1D1A]">
                    No encontramos ningún producto con esa búsqueda
                  </h3>
                  <p className="text-xs text-[#7D6858] max-w-sm mx-auto font-medium">
                    Prueba buscando por palabras como "croissant", "latte", "tostón", "budín" o reinicia los filtros.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDietary([]);
                      setShowOnlyFavorites(false);
                      setPopularOnly(false);
                      setSelectedCategory('todos');
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#C05C38] to-[#D99443] text-white text-xs font-bold rounded-2xl hover:from-[#A64724] hover:to-[#C05C38] transition-colors cursor-pointer shadow-md shadow-[#2C1D1A]/10"
                  >
                    Ver toda la carta
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectProduct={(p) => setSelectedProductForModal(p)}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* Footer Component */}
          <Footer
            cartCount={cartCount}
            cartTotal={cartTotal}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenStoreInfo={() => setIsStoreInfoOpen(true)}
            onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
            onOpenPrivacyPolicies={() => setIsPrivacyPoliciesOpen(true)}
          />
        </div>
      </div>

      {/* Product Customization Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Checkout Slide-Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        orderType={orderType}
        onChangeOrderType={setOrderType}
        selectedTable={selectedTable}
        onSelectTable={setSelectedTable}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Order Confirmation & Tracker Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onNewOrder={() => {
          setConfirmedOrder(null);
          setSelectedCategory('todos');
        }}
      />

      {/* Store History & Opening Hours Modal */}
      <StoreInfoModal
        isOpen={isStoreInfoOpen}
        onClose={() => setIsStoreInfoOpen(false)}
      />

      {/* Price & Product Manager Modal */}
      <PriceManagerModal
        isOpen={isPriceManagerOpen}
        onClose={() => setIsPriceManagerOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
        onResetDefaults={handleResetDefaults}
        currentRole={currentRole}
        adminPassword={adminPassword}
        onUnlockAdmin={() => {
          setCurrentRole('admin');
          showToast('¡Bienvenido, Administrador! Precios desbloqueados 👑');
        }}
        onOpenPrivacyPolicies={() => setIsPrivacyPoliciesOpen(true)}
      />

      {/* Admin & Shift Manager Authentication Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        currentRole={currentRole}
        onSelectRole={(r) => {
          setCurrentRole(r);
          if (r === 'admin') showToast('Rol activo: Administrador General 👑');
          else if (r === 'shift_manager') showToast('Rol activo: Encargado de Turno 👔');
          else showToast('Rol activo: Comensal 👤');
        }}
        adminPassword={adminPassword}
        onChangeAdminPassword={handleChangeAdminPassword}
        onOpenPrivacyPolicies={() => setIsPrivacyPoliciesOpen(true)}
        onSuccessAdminAuth={() => setIsPriceManagerOpen(true)}
      />

      {/* Privacy Policies & Roles Governance Modal */}
      <PrivacyPoliciesModal
        isOpen={isPrivacyPoliciesOpen}
        onClose={() => setIsPrivacyPoliciesOpen(false)}
      />
    </div>
  );
}
