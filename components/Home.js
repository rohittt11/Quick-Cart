import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import logo from "../assets/Quickcart.png";
import sale from "../assets/Sale.jpg";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "flex-start",
  },
  sale: {
    flex: 1,
    height: 100,
    resizeMode: "cover",
    marginLeft: 10,
  },
  filtersSection: {
    width: "100%", // Full width for row layout
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-around", // Space out buttons evenly
  },
  filtersButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    flex: 1, // Equal width for buttons
    marginHorizontal: 5, // Space between buttons
  },
  activeFilterButton: {
    backgroundColor: "#ccc",
  },
  productListSection: {
    flex: 1,
    padding: 10,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dedede",
  },
  imageWrapper: {
    flex: 1,
    alignItems: "center",
  },
  textWrapper: {
    flex: 3,
    paddingHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartText: {
    color: "#0096FF",
    fontWeight: "bold",
  },
  cartText1: {
    color: "#FF0000",
    fontWeight: "bold",
  },
  cartIcon: {
    position: "absolute",
    top: 20,
    right: 30, // Adjusted to be on the left side
    zIndex: 1, // Ensure the cart icon is above other elements
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    width: "60%",
    borderColor: "#ccc",
    marginBottom: 10,
    marginLeft: 10, // Adjusted to account for the cart icon width and padding
  },
  searchBarContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    flexDirection: "row", // Align search input and cart icon horizontally
    alignItems: "center", // Center items vertically
  },
});

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState(null); // 'price_asc', 'price_desc'
  const [cartItems, setCartItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); // Initialize filtered products with all products
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const applySorting = (type) => {
    let sortedProducts = [...filteredProducts];

    if (type === "price_asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === "price_desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
    setSortType(type);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  const openCartPage = () => {
    navigation.navigate("Cart", {
      cartItems: cartItems,
      removeFromCart: removeFromCart,
      setCartItems: setCartItems, // Pass setCartItems function to Cart component
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.textWrapper}>
        <Text>{item.title}</Text>
        <Text>Price: ${item.price}</Text>
        {cartItems.find((cartItem) => cartItem.id === item.id) ? (
          <TouchableOpacity onPress={() => removeFromCart(item)}>
            <Text style={styles.cartText1}>Remove from Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => addToCart(item)}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo}></Image>
        <Image source={sale} style={styles.sale}></Image>
      </View>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TouchableOpacity style={styles.cartIcon} onPress={openCartPage}>
          <MaterialCommunityIcons name="cart" size={30} color="#000" />
          <View
            style={{
              position: "absolute",
              right: -8,
              top: -5,
              backgroundColor: "red",
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{cartItems.length}</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Filters Section */}
      <View style={styles.filtersSection}>
        <TouchableOpacity
          style={[
            styles.filtersButton,
            sortType === "price_asc" && styles.activeFilterButton,
          ]}
          onPress={() => applySorting("price_asc")}
        >
          <Text>Price Low-High</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filtersButton,
            sortType === "price_desc" && styles.activeFilterButton,
          ]}
          onPress={() => applySorting("price_desc")}
        >
          <Text>Price High-Low</Text>
        </TouchableOpacity>
        {/* Add more filters/buttons as needed */}
      </View>

      {/* Product List Section */}
      <View style={styles.productListSection}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }} // Adjust if needed
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
