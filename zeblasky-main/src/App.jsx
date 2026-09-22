import { useState, useEffect } from "react";

const categories = [
  { name: "Biryani", icon: "🍛" },
  { name: "Pizza", icon: "🍕" },
  { name: "Burgers", icon: "🍔" },
  { name: "Asian", icon: "🍜" },
  { name: "Desserts", icon: "🍰" },
  { name: "Drinks", icon: "🥤" },
  { name: "Snacks", icon: "🍿" },
];

const restaurants = [
  {
    name: "Malabar House",
    type: "Kerala • Biryani • Grills",
    rating: "4.8",
    time: "25–30 min",
    price: "₹149",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Crust & Co.",
    type: "Pizza • Italian • Pasta",
    rating: "4.7",
    time: "20–25 min",
    price: "₹199",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Stacked Burger Lab",
    type: "Burgers • Fries • Shakes",
    rating: "4.6",
    time: "20–25 min",
    price: "₹179",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Wok Republic",
    type: "Asian • Noodles • Rice",
    rating: "4.7",
    time: "25–35 min",
    price: "₹169",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
  },
];

const snacks = [
  {
    name: "Lay's Classic",
    category: "Chips",
    price: "₹20",
    image:
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kurkure Masala Munch",
    category: "Chips",
    price: "₹20",
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Oreo Original",
    category: "Biscuits",
    price: "₹40",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Cadbury Dairy Milk",
    category: "Chocolate",
    price: "₹50",
    image:
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Haldiram's Aloo Bhujia",
    category: "Namkeen",
    price: "₹55",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Paper Boat Aamras",
    category: "Drinks",
    price: "₹35",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Bingo! Tedhe Medhe",
    category: "Quick Bites",
    price: "₹20",
    image:
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Parle Hide & Seek",
    category: "Biscuits",
    price: "₹30",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingState, setTrackingStage] = useState(0);

  useEffect(() => {
    if (!trackingOpen) return;

    const timer = setInterval(() => {
      setTrackingStage((stage) => {
        if (stage < 4) {
          return stage + 1;
        }
        return stage;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [trackingOpen]);

  const [search, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const resetAllViews = () => {
    setSelectedRestaurant(null);
    setCheckoutOpen(false);
    setTrackingOpen(false);
  };

  const addToCart = (name, price) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.name === name);

      if (existingItem) {
        return currentCart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentCart,
        {
          name,
          price,
          quantity: 1,
        },
      ];
    });
  };

  const changeQuantity = (name, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    const restaurantText = [restaurant.name, restaurant.type]
      .join(" ")
      .toLowerCase();

    const menuText = (
      restaurant.name === "Malabar House"
        ? [
            "Malabar Chicken Biryani",
            "Kerala Porotta & Beef Curry",
            "Appam & Chicken Curry",
            "Chicken 65",
          ]
        : restaurant.name === "Crust & Co."
          ? [
              "Classic Margherita Pizza",
              "Chicken Pepperoni Pizza",
              "Creamy Alfredo Pasta",
              "Garlic Cheese Bread",
            ]
          : restaurant.name === "Stacked Burger Lab"
            ? [
                "Classic Smash Burger",
                "Double Cheese Smash",
                "Crispy Chicken Burger",
                "Loaded Fries",
              ]
            : [
                "Chicken Hakka Noodles",
                "Schezwan Fried Rice",
                "Chicken Manchurian",
                "Asian Chicken Bowl",
              ]
    )
      .join(" ")
      .toLowerCase();

    return `${restaurantText} ${menuText}`.includes(query);
  });

  return (
    <div style={styles.page}>
      {/* ALWAYS VISIBLE NAVBAR */}
      <nav style={styles.navbar}>
        <div style={{ ...styles.logoArea, cursor: "pointer" }} onClick={resetAllViews}>
          <div style={styles.logoMark}>Z</div>
          <div>
            <div style={styles.logo}>ZEBLASKY</div>
            <div style={styles.logoTagline}>FOOD • SNACKS • MORE</div>
          </div>
        </div>

        <div style={styles.navLinks}>
          <a href="#home" onClick={resetAllViews}>Home</a>
          <a href="#restaurants" onClick={resetAllViews}>Restaurants</a>
          <a href="#snacks" onClick={resetAllViews}>Snacks</a>
          <a href="#about" onClick={resetAllViews}>About</a>
        </div>

        <div style={styles.navActions}>
          <button style={styles.locationButton}>📍 Kanjirappally</button>

          <button style={styles.cartButton} onClick={() => setCartOpen(true)}>
            🛒 Cart
            {cart.length > 0 && (
              <span style={styles.cartBadge}>{cart.length}</span>
            )}
          </button>
        </div>
      </nav>

      {/* TRACKING PAGE */}
      {trackingOpen && (
        <div
          style={{
            position: "fixed",
            top: "76px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fffaf5",
            zIndex: 6000,
            overflowY: "auto",
            padding: "30px 6%",
          }}
        >
          <div style={{ maxWidth: "850px", margin: "0 auto" }}>
            <button
              onClick={() => setTrackingOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
                marginBottom: "25px",
              }}
            >
              ← Back to ZEBLASKY
            </button>

            <h1 style={{ fontSize: "40px", marginBottom: "5px" }}>
              Track your order 🚴
            </h1>

            <p style={{ color: "#777" }}>Order #ZB48291</p>

            <div
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "30px",
                marginTop: "25px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  background: "#fff7ed",
                  borderRadius: "18px",
                  padding: "20px",
                  textAlign: "center",
                  marginBottom: "30px",
                }}
              >
                <div style={{ fontSize: "45px" }}>🛵</div>
                <h2 style={{ margin: "10px 0 5px" }}>
                  Your order is on the way!
                </h2>
                <p style={{ color: "#777" }}>Estimated arrival</p>
                <strong style={{ color: "#f97316", fontSize: "24px" }}>
                  25–35 min
                </strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                <div style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingBottom: "25px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#22c55e", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800" }}>✓</div>
                  <div>
                    <h3 style={{ margin: "0 0 5px" }}>Order Confirmed</h3>
                    <p style={{ margin: 0, color: "#777" }}>Your order has been received.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingBottom: "25px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#22c55e", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
                  <div>
                    <h3 style={{ margin: "0 0 5px" }}>Restaurant Preparing</h3>
                    <p style={{ margin: 0, color: "#777" }}>Your food is being prepared.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingBottom: "25px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#f97316", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>🚴</div>
                  <div>
                    <h3 style={{ margin: "0 0 5px" }}>Rider Picked Up</h3>
                    <p style={{ margin: 0, color: "#777" }}>Your delivery partner has picked up the order.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "18px", alignItems: "flex-start", paddingBottom: "25px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
                  <div>
                    <h3 style={{ margin: "0 0 5px" }}>On the Way</h3>
                    <p style={{ margin: 0, color: "#777" }}>Your order is heading to you.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>🏠</div>
                  <div>
                    <h3 style={{ margin: "0 0 5px" }}>Delivered</h3>
                    <p style={{ margin: 0, color: "#777" }}>Enjoy your meal!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORDER PLACED MODAL */}
      {orderPlaced && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "25px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "white",
              borderRadius: "28px",
              padding: "45px 30px",
              textAlign: "center",
              boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                width: "85px",
                height: "85px",
                borderRadius: "50%",
                background: "#22c55e",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "42px",
                margin: "0 auto 25px",
              }}
            >
              ✓
            </div>

            <h1 style={{ fontSize: "36px", margin: "0 0 10px" }}>Order Confirmed!</h1>
            <p style={{ color: "#777", fontSize: "16px" }}>Your food is being prepared 🍔</p>

            <div style={{ background: "#fff7ed", borderRadius: "18px", padding: "20px", marginTop: "25px" }}>
              <strong>Order #ZB48291</strong>
              <p style={{ margin: "10px 0 0", color: "#666" }}>Estimated delivery</p>
              <strong style={{ color: "#f97316", fontSize: "20px" }}>25–35 min</strong>
            </div>

            <button
              onClick={() => {
                setOrderPlaced(false);
                setTrackingStage(0);
                setTrackingOpen(true);
              }}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "15px",
                border: "none",
                borderRadius: "14px",
                background: "#f97316",
                color: "white",
                fontSize: "16px",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              Track Order 🚴
            </button>
          </div>
        </div>
      )}

      {/* CHECKOUT PAGE */}
      {checkoutOpen && (
        <div
          style={{
            position: "fixed",
            top: "76px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fffaf5",
            zIndex: 3000,
            overflowY: "auto",
            padding: "30px 6%",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <button
              onClick={() => setCheckoutOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
                marginBottom: "25px",
              }}
            >
              ← Back to basket
            </button>

            <h1 style={{ fontSize: "42px", marginBottom: "8px" }}>Checkout</h1>
            <p style={{ color: "#777" }}>Almost there! Complete your delivery details.</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
                gap: "25px",
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "25px",
                  borderRadius: "22px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.07)",
                }}
              >
                <h2>📍 Delivery details</h2>
                <input type="text" placeholder="Full name" style={styles.checkoutInput} />
                <input type="text" placeholder="Phone number" style={styles.checkoutInput} />
                <input type="text" placeholder="House / Flat / Building" style={styles.checkoutInput} />
                <input type="text" placeholder="Street / Area" style={styles.checkoutInput} />
                <input type="text" placeholder="City" style={styles.checkoutInput} />

                <h3 style={{ marginTop: "25px" }}>💳 Payment method</h3>
                <div
                  style={{
                    padding: "15px",
                    border: "2px solid #f97316",
                    borderRadius: "14px",
                    background: "#fff7ed",
                  }}
                >
                  💵 Cash on Delivery
                </div>
              </div>

              <div
                style={{
                  background: "white",
                  padding: "25px",
                  borderRadius: "22px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.07)",
                  height: "fit-content",
                }}
              >
                <h2>🛒 Order summary</h2>

                {cart.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "12px 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <span>{item.name} × {item.quantity}</span>
                    <strong>₹{Number(item.price.replace("₹", "")) * item.quantity}</strong>
                  </div>
                ))}

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                  <span>Delivery</span>
                  <span>₹30</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", fontSize: "22px" }}>
                  <strong>Total</strong>
                  <strong style={{ color: "#f97316" }}>
                    ₹
                    {cart.reduce(
                      (total, item) => total + Number(item.price.replace("₹", "")) * item.quantity,
                      30,
                    )}
                  </strong>
                </div>

                <button
                  onClick={() => {
                    setCheckoutOpen(false);
                    setOrderPlaced(true);
                  }}
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    padding: "16px",
                    border: "none",
                    borderRadius: "14px",
                    background: "#f97316",
                    color: "white",
                    fontSize: "17px",
                    fontWeight: "800",
                    cursor: "pointer",
                  }}
                >
                  Place Order 🎉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "380px",
            height: "100vh",
            backgroundColor: "#fffaf5",
            color: "#222222",
            zIndex: 9999,
            padding: "25px",
            boxSizing: "border-box",
            boxShadow: "-10px 0 30px rgba(0,0,0,0.2)",
            overflowY: "auto",
          }}
        >
          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "8px 12px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>

          <h2 style={{ fontSize: "28px", margin: "25px 0", color: "#222" }}>
            Your Basket 🛒
          </h2>

          {cart.length === 0 ? (
            <div
              style={{
                background: "#ffffff",
                padding: "25px",
                borderRadius: "18px",
                textAlign: "center",
                color: "#555",
              }}
            >
              <div style={{ fontSize: "45px" }}>🛒</div>
              <h3>Your basket is empty</h3>
              <p>Add something delicious from a restaurant.</p>
            </div>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#ffffff",
                    color: "#222",
                    padding: "16px",
                    borderRadius: "16px",
                    marginBottom: "12px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                  }}
                >
                  <strong>{item.name}</strong>

                  <div style={{ marginTop: "6px", color: "#f97316", fontWeight: "800" }}>
                    {item.price}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
                    <button
                      onClick={() => changeQuantity(item.name, -1)}
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#eee",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      −
                    </button>

                    <strong>{item.quantity}</strong>

                    <button
                      onClick={() => changeQuantity(item.name, 1)}
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#f97316",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "25px", paddingTop: "20px", borderTop: "1px solid #ddd" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span>Subtotal</span>
                  <strong>
                    ₹
                    {cart.reduce(
                      (total, item) => total + Number(item.price.replace("₹", "")) * item.quantity,
                      0,
                    )}
                  </strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#777" }}>
                  <span>Delivery fee</span>
                  <span>₹30</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", marginTop: "15px" }}>
                  <strong>Total</strong>
                  <strong style={{ color: "#f97316" }}>
                    ₹
                    {cart.reduce(
                      (total, item) => total + Number(item.price.replace("₹", "")) * item.quantity,
                      30,
                    )}
                  </strong>
                </div>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "15px",
                    border: "none",
                    borderRadius: "14px",
                    background: "#f97316",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "800",
                    cursor: "pointer",
                  }}
                >
                  Proceed to Checkout →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SINGLE RESTAURANT MENU VIEW */}
      {selectedRestaurant && (
        <div
          style={{
            position: "fixed",
            top: "76px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fffaf5",
            zIndex: 1000,
            overflowY: "auto",
            padding: "30px 6%",
          }}
        >
          <button
            onClick={() => setSelectedRestaurant(null)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "25px",
            }}
          >
            ← Back to restaurants
          </button>

          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <img
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
                borderRadius: "24px",
              }}
            />

            <div style={{ marginTop: "25px" }}>
              <span style={{ color: "#f97316", fontWeight: "800", fontSize: "13px" }}>
                {selectedRestaurant.type}
              </span>

              <h1 style={{ fontSize: "42px", margin: "8px 0" }}>
                {selectedRestaurant.name}
              </h1>

              <p style={{ color: "#666", fontSize: "16px" }}>
                ⭐ {selectedRestaurant.rating} · 🕒 {selectedRestaurant.time} · From {selectedRestaurant.price}
              </p>

              <h2 style={{ marginTop: "35px" }}>Popular dishes</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "20px",
                  marginTop: "20px",
                  width: "100%",
                }}
              >
                {(selectedRestaurant.name === "Malabar House"
                  ? [
                      ["Malabar Chicken Biryani", "₹190", "🍗"],
                      ["Kerala Porotta & Beef Curry", "₹180", "🥘"],
                      ["Appam & Chicken Curry", "₹220", "🥥"],
                      ["Chicken 65", "₹150", "🍗"],
                    ]
                  : selectedRestaurant.name === "Crust & Co."
                    ? [
                        ["Classic Margherita Pizza", "₹249", "🍕"],
                        ["Chicken Pepperoni Pizza", "₹329", "🍕"],
                        ["Creamy Alfredo Pasta", "₹279", "🍝"],
                        ["Garlic Cheese Bread", "₹159", "🧄"],
                      ]
                    : selectedRestaurant.name === "Stacked Burger Lab"
                      ? [
                          ["Classic Smash Burger", "₹199", "🍔"],
                          ["Double Cheese Smash", "₹279", "🧀"],
                          ["Crispy Chicken Burger", "₹229", "🍗"],
                          ["Loaded Fries", "₹149", "🍟"],
                        ]
                      : [
                          ["Chicken Hakka Noodles", "₹189", "🍜"],
                          ["Schezwan Fried Rice", "₹179", "🍚"],
                          ["Chicken Manchurian", "₹219", "🥢"],
                          ["Asian Chicken Bowl", "₹249", "🥗"],
                        ]
                ).map(([name, price, emoji]) => (
                  <div
                    key={name}
                    style={{
                      background: "#ffffff",
                      borderRadius: "20px",
                      padding: "18px",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "15px",
                      minHeight: "120px",
                      border: "1px solid #f1eee9",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "30px" }}>{emoji}</div>
                      <h3 style={{ margin: "10px 0 5px" }}>{name}</h3>
                      <strong>{price}</strong>
                    </div>

                    <button
                      onClick={() => addToCart(name, price)}
                      style={{
                        border: "none",
                        background: "#f97316",
                        color: "white",
                        borderRadius: "12px",
                        padding: "10px 14px",
                        fontWeight: "800",
                        cursor: "pointer",
                      }}
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>✦ YOUR EVERYDAY FOOD MARKETPLACE</div>

          <h1 style={styles.heroTitle}>
            Your cravings.
            <br />
            <span style={styles.heroAccent}>One smart basket.</span>
          </h1>

          <p style={styles.heroText}>
            Discover restaurants, quick bites, snacks and everyday favourites —
            all in one place.
          </p>

          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔎</span>
            <input
              type="text"
              placeholder="Search for food, restaurants or snacks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            <button style={styles.searchButton}>Search</button>
          </div>

          <div style={styles.heroFeatures}>
            <span>⚡ Fast delivery</span>
            <span>🍴 Wide selection</span>
            <span>🛍️ One basket</span>
          </div>
        </div>

        <div style={styles.heroVisual}>
          <div style={styles.heroCircle}></div>
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=90"
            alt="Delicious food"
            style={styles.heroImage}
          />
          <div style={styles.floatingCard}>
            <div style={styles.deliveryIcon}>🛵</div>
            <div>
              <strong>Fast delivery</strong>
              <div style={styles.smallText}>At your doorstep</div>
            </div>
          </div>

          <div style={styles.ratingCard}>
            <strong>⭐ 4.9</strong>
            <span>Customer rating</span>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <span style={styles.eyebrow}>EXPLORE</span>
            <h2 style={styles.sectionTitle}>What are you craving?</h2>
          </div>
          <button style={styles.viewButton}>View all →</button>
        </div>

        <div style={styles.categoryGrid}>
          {categories.map((category) => (
            <div key={category.name} style={styles.categoryCard}>
              <div style={styles.categoryIcon}>{category.icon}</div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* RESTAURANTS */}
      <section id="restaurants" style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <span style={styles.eyebrow}>NEAR YOU</span>
            <h2 style={styles.sectionTitle}>Popular restaurants</h2>
          </div>
          <button style={styles.viewButton}>Explore restaurants →</button>
        </div>

        <div style={styles.restaurantGrid}>
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.name} style={styles.restaurantCard}>
              <div style={styles.restaurantImageContainer}>
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  style={styles.restaurantImage}
                />
                <div style={styles.deliveryBadge}>⚡ FAST</div>
                <button style={styles.favoriteButton}>♡</button>
              </div>

              <div style={styles.restaurantInfo}>
                <div style={styles.restaurantTop}>
                  <h3 style={styles.restaurantName}>{restaurant.name}</h3>
                  <span style={styles.rating}>★ {restaurant.rating}</span>
                </div>

                <p style={styles.restaurantType}>{restaurant.type}</p>

                <div style={styles.restaurantBottom}>
                  <span>🛵 {restaurant.time}</span>
                  <span>From {restaurant.price}</span>
                </div>
                <button
                  style={styles.menuButton}
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  View Menu →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SMART BASKET */}
      <section style={styles.smartBasket}>
        <div style={styles.smartBasketText}>
          <span style={styles.eyebrow}>THE ZEBLASKY DIFFERENCE</span>
          <h2 style={styles.smartTitle}>
            More than a food
            <br />
            delivery app.
          </h2>
          <p style={styles.smartText}>
            Restaurants, snacks and everyday favourites can live together in one
            convenient marketplace.
          </p>
          <button style={styles.darkButton}>Explore ZEBLASKY →</button>
        </div>

        <div style={styles.basketVisual}>
          <div style={styles.basketCircle}></div>
          <div style={styles.foodStack}>
            <div style={styles.stackItem}>🍛</div>
            <div style={styles.plus}>+</div>
            <div style={styles.stackItem}>🍟</div>
            <div style={styles.plus}>+</div>
            <div style={styles.stackItem}>🍫</div>
            <div style={styles.equals}>=</div>
            <div style={styles.zLogo}>Z</div>
          </div>
          <div style={styles.basketLabel}>ONE SMART BASKET</div>
        </div>
      </section>

      {/* SNACKS */}
      <section id="snacks" style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <span style={styles.eyebrow}>ZEBLASKY MARKET</span>
            <h2 style={styles.sectionTitle}>The Snack Shelf</h2>
          </div>
          <button style={styles.viewButton}>Shop snacks →</button>
        </div>

        <div style={styles.snackGrid}>
          {snacks.map((snack) => (
            <div
              key={snack.name}
              style={styles.snackCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 18px 40px rgba(0,0,0,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.06)";
              }}
            >
              <div style={styles.snackImageContainer}>
                <img
                  src={snack.image}
                  alt={snack.name}
                  style={styles.snackImage}
                />
              </div>

              <div style={styles.snackInfo}>
                <span style={styles.snackCategory}>{snack.category}</span>
                <h3>{snack.name}</h3>

                <div style={styles.snackBottom}>
                  <strong>{snack.price}</strong>
                  <button
                    style={styles.addButton}
                    onClick={() => addToCart(snack.name, snack.price)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section style={styles.promo}>
        <div>
          <span style={styles.promoSmall}>FIRST ORDER?</span>
          <h2 style={styles.promoTitle}>
            Something delicious
            <br />
            is waiting.
          </h2>
          <p style={styles.promoText}>
            Get special offers and discover something new today.
          </p>
          <button style={styles.promoButton}>Start exploring →</button>
        </div>
        <div style={styles.promoEmoji}>🍕</div>
      </section>

      {/* FOOTER */}
      <footer id="about" style={styles.footer}>
        <div style={styles.footerBrand}>
          <div style={styles.footerLogo}>
            <div style={styles.logoMark}>Z</div>
            <span>ZEBLASKY</span>
          </div>
          <p>
            Your world of food,
            <br />
            one smart basket.
          </p>
        </div>

        <div style={styles.footerColumn}>
          <h4>Explore</h4>
          <span>Restaurants</span>
          <span>Snacks</span>
          <span>Offers</span>
          <span>New arrivals</span>
        </div>

        <div style={styles.footerColumn}>
          <h4>Company</h4>
          <span>About ZEBLASKY</span>
          <span>Careers</span>
          <span>Partner with us</span>
          <span>Contact</span>
        </div>

        <div style={styles.footerColumn}>
          <h4>Support</h4>
          <span>Help centre</span>
          <span>Safety</span>
          <span>Terms</span>
          <span>Privacy</span>
        </div>
      </footer>

      <div style={styles.copyright}>
        © 2026 ZEBLASKY. Academic project concept.
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const styles = {
  checkoutInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    marginTop: "12px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
  },
  page: {
    minHeight: "100vh",
    background: "#f8f4ed",
    color: "#211f1c",
    fontFamily: "Inter, Arial, Helvetica, sans-serif",
  },

  navbar: {
    height: "76px",
    padding: "0 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(248,244,237,0.98)",
    borderBottom: "1px solid #e9e1d5",
    position: "sticky",
    top: 0,
    zIndex: 7000,
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoMark: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    background: "#f25c35",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "22px",
  },

  logo: {
    fontSize: "19px",
    fontWeight: "900",
    letterSpacing: "2px",
  },

  logoTagline: {
    fontSize: "7px",
    letterSpacing: "1.5px",
    color: "#8c857d",
    marginTop: "2px",
  },

  navLinks: {
    display: "flex",
    gap: "28px",
  },

  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  locationButton: {
    border: "1px solid #ddd4c8",
    background: "#fffdf9",
    padding: "10px 14px",
    borderRadius: "30px",
    cursor: "pointer",
  },

  cartButton: {
    position: "relative",
    border: "none",
    background: "#211f1c",
    color: "white",
    padding: "11px 18px",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "700",
  },

  cartBadge: {
    position: "absolute",
    top: "-7px",
    right: "-5px",
    background: "#f25c35",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },

  hero: {
    minHeight: "650px",
    padding: "70px 7%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "50px",
    background:
      "radial-gradient(circle at 80% 30%, #ffd6b8 0%, transparent 35%), #f8f4ed",
    overflow: "hidden",
  },

  heroContent: {
    maxWidth: "650px",
  },

  heroBadge: {
    display: "inline-block",
    background: "#fff0e7",
    color: "#e6532f",
    padding: "9px 14px",
    borderRadius: "30px",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1px",
    marginBottom: "20px",
  },

  heroTitle: {
    fontSize: "clamp(50px, 6vw, 82px)",
    lineHeight: "0.98",
    margin: "0",
    letterSpacing: "-4px",
    fontWeight: "900",
  },

  heroAccent: {
    color: "#f25c35",
  },

  heroText: {
    fontSize: "18px",
    lineHeight: "1.7",
    color: "#716b64",
    maxWidth: "570px",
    margin: "25px 0",
  },

  searchBox: {
    maxWidth: "620px",
    display: "flex",
    alignItems: "center",
    background: "white",
    border: "1px solid #e6ddd2",
    borderRadius: "18px",
    padding: "7px",
    boxShadow: "0 15px 40px rgba(50,35,20,0.08)",
  },

  searchIcon: {
    fontSize: "20px",
    marginLeft: "14px",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "15px",
    fontSize: "15px",
    background: "transparent",
  },

  searchButton: {
    border: "none",
    background: "#f25c35",
    color: "white",
    padding: "14px 24px",
    borderRadius: "13px",
    fontWeight: "800",
    cursor: "pointer",
  },

  heroFeatures: {
    display: "flex",
    gap: "25px",
    marginTop: "20px",
    color: "#756e67",
    fontSize: "13px",
  },

  heroVisual: {
    position: "relative",
    minHeight: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  heroCircle: {
    position: "absolute",
    width: "470px",
    height: "470px",
    borderRadius: "50%",
    background: "#f4c39d",
  },

  heroImage: {
    width: "440px",
    height: "440px",
    objectFit: "cover",
    borderRadius: "50%",
    position: "relative",
    zIndex: 2,
    boxShadow: "0 30px 70px rgba(70,40,20,0.25)",
  },

  floatingCard: {
    position: "absolute",
    bottom: "50px",
    left: "5%",
    zIndex: 5,
    background: "white",
    padding: "14px 18px",
    borderRadius: "17px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
  },

  deliveryIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "#e7f5e9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  smallText: {
    color: "#888",
    fontSize: "12px",
    marginTop: "3px",
  },

  ratingCard: {
    position: "absolute",
    top: "60px",
    right: "3%",
    zIndex: 5,
    background: "#211f1c",
    color: "white",
    padding: "14px 18px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
  },

  section: {
    padding: "90px 7%",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    marginBottom: "35px",
  },

  eyebrow: {
    color: "#f25c35",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
  },

  sectionTitle: {
    fontSize: "38px",
    margin: "8px 0 0",
    letterSpacing: "-1.5px",
  },

  viewButton: {
    background: "transparent",
    border: "none",
    fontWeight: "800",
    cursor: "pointer",
    color: "#f25c35",
  },

  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "15px",
  },

  categoryCard: {
    background: "white",
    border: "1px solid #eee5da",
    borderRadius: "20px",
    padding: "22px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    fontWeight: "700",
    transition: "0.2s",
  },

  categoryIcon: {
    fontSize: "35px",
  },

  restaurantGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },

  restaurantCard: {
    background: "white",
    borderRadius: "22px",
    overflow: "hidden",
    border: "1px solid #eee5da",
    boxShadow: "0 10px 30px rgba(60,40,20,0.05)",
  },

  restaurantImageContainer: {
    height: "220px",
    position: "relative",
    overflow: "hidden",
  },

  restaurantImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  deliveryBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "#e9f7e9",
    color: "#28733a",
    padding: "7px 10px",
    borderRadius: "20px",
    fontSize: "10px",
    fontWeight: "900",
  },

  favoriteButton: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    border: "none",
    background: "white",
    fontSize: "20px",
    cursor: "pointer",
  },

  restaurantInfo: {
    padding: "18px",
  },

  restaurantTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },

  restaurantName: {
    margin: "0",
    fontSize: "18px",
  },

  rating: {
    background: "#e8f5e9",
    color: "#28733a",
    padding: "5px 8px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "800",
    height: "fit-content",
  },

  restaurantType: {
    color: "#817a72",
    fontSize: "13px",
    margin: "8px 0 18px",
  },

  restaurantBottom: {
    display: "flex",
    justifyContent: "space-between",
    color: "#777",
    fontSize: "12px",
  },

  menuButton: {
    marginTop: "12px",
    width: "100%",
    border: "none",
    background: "#f97316",
    color: "white",
    padding: "10px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },

  smartBasket: {
    margin: "20px 7% 80px",
    padding: "70px",
    borderRadius: "35px",
    background: "#211f1c",
    color: "white",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    overflow: "hidden",
  },

  smartTitle: {
    fontSize: "55px",
    lineHeight: "1",
    letterSpacing: "-2px",
    margin: "15px 0",
  },

  smartText: {
    color: "#bcb5ae",
    lineHeight: "1.7",
    maxWidth: "480px",
  },

  darkButton: {
    marginTop: "20px",
    border: "none",
    background: "#f25c35",
    color: "white",
    padding: "14px 20px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
  },

  basketVisual: {
    position: "relative",
    minHeight: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  basketCircle: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "#38332f",
  },

  foodStack: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "32px",
  },

  stackItem: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    color: "#f25c35",
  },

  equals: {
    color: "white",
    fontSize: "30px",
  },

  zLogo: {
    width: "70px",
    height: "70px",
    borderRadius: "20px",
    background: "#f25c35",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    color: "white",
  },

  basketLabel: {
    position: "relative",
    zIndex: 2,
    marginTop: "25px",
    letterSpacing: "3px",
    fontSize: "11px",
    color: "#c5beb7",
  },

  snackGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "24px",
    marginTop: "25px",
  },

  snackCard: {
    background: "#ffffff",
    borderRadius: "22px",
    overflow: "hidden",
    border: "1px solid #eee9e2",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },

  snackImageContainer: {
    height: "210px",
    background: "#f7f3ed",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  snackImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },

  snackInfo: {
    padding: "18px",
    background: "#ffffff",
  },

  snackCategory: {
    display: "inline-block",
    color: "#f25c35",
    fontSize: "11px",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "6px",
  },

  snackBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "14px",
  },

  addButton: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    border: "none",
    background: "#ff6b35",
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s ease, background 0.2s ease",
  },

  promo: {
    margin: "20px 7% 90px",
    padding: "60px",
    borderRadius: "35px",
    background: "linear-gradient(120deg, #f25c35, #ff8c5a)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },

  promoSmall: {
    fontSize: "11px",
    letterSpacing: "2px",
    fontWeight: "900",
  },

  promoTitle: {
    fontSize: "48px",
    lineHeight: "1",
    margin: "15px 0",
    letterSpacing: "-2px",
  },

  promoText: {
    opacity: "0.85",
  },

  promoButton: {
    marginTop: "15px",
    background: "white",
    color: "#e6532f",
    border: "none",
    padding: "14px 20px",
    borderRadius: "12px",
    fontWeight: "800",
    cursor: "pointer",
  },

  promoEmoji: {
    fontSize: "180px",
    transform: "rotate(-15deg)",
  },

  footer: {
    padding: "70px 7%",
    background: "#211f1c",
    color: "white",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "40px",
  },

  footerBrand: {
    color: "#bcb5ae",
    lineHeight: "1.7",
  },

  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    fontWeight: "900",
    fontSize: "20px",
    letterSpacing: "2px",
  },

  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "13px",
    color: "#aaa39c",
    fontSize: "13px",
  },

  copyright: {
    background: "#211f1c",
    borderTop: "1px solid #38332f",
    color: "#77716b",
    padding: "20px 7%",
    fontSize: "11px",
  },
};

export default App;