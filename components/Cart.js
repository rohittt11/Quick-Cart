import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Cart = ({ route, navigation }) => {
  const { cartItems, removeFromCart, setCartItems } = route.params;
  const [totalCost, setTotalCost] = useState(0);

  // Calculate total cost when cartItems change
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    setTotalCost(total);
  }, [cartItems]);

  const handleOrder = () => {
    // Implement order logic here (fake implementation)
    alert("Thank you..Your Order Placed Successfully!");
    // Clear cartItems after placing order
    setCartItems([]);
    // Navigate back to home or any other appropriate screen
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Products List */}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        )}
      />

      {/* Total Cost */}
      <View>
        <Text style={styles.orderDetails}>Order Details...</Text>
      </View>
      <View style={styles.totalContainer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.productRow}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>${totalCost.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Order Button */}
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: 60,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    color: "#888",
  },
  removeButton: {
    padding: 8,
    backgroundColor: "#dc3545",
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  orderDetails: {
    color: "#000080",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  totalContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  totalBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.0,
    elevation: 5,
  },
  totalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  productTitle: {
    fontSize: 16,
    flex: 2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  orderButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  orderButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cart;
