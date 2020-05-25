// Action Types and Actions have been defined in this class only for brevity

// Action Types
// Using constants since strings can be passed incorrectly
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SHOW_PRODUCT_DETAILS = 'SHOW_PRODUCT_DETAILS';
export const ADD_MOBILE_TO_CART = 'ADD_MOBILE_TO_CART';
export const REMOVE_MOBILE_FROM_CART = 'REMOVE_MOBILE_FROM_CART';
export const REMOVE_N_NUMBER_OF_ITEMS = 'REMOVE_N_NUMBER_OF_ITEMS';
export const ADD_N_NUMBER_OF_ITEMS = 'ADD_N_NUMBER_OF_ITEMS';
export const ADD_SHIPPING_FOR_PRIME = 'ADD_SHIPPING_FOR_PRIME';
export const REMOVE_SHIPPING_COST = 'REMOVE_SHIPPING_COST';

// Actions

// Set List of Products fetched from Server
export const setProductList = (products) => {
    return { type: SET_PRODUCT_LIST, products }
}

// Show Product Details
export const showProductDetails = (id) => {
    return { type: SHOW_PRODUCT_DETAILS, id }
}

// Add A Product with Product ID To Cart
export const addProductToCart = (id) => {
    return { type: ADD_MOBILE_TO_CART, id }
}

// Remove A Product with Product ID From Cart
export const removeProductFromCart = (id) => {
    return { type: REMOVE_MOBILE_FROM_CART, id }
}

// Remove N number of Items from the Cart
export const removeNItems = (id) => {
    return { type: REMOVE_N_NUMBER_OF_ITEMS, id }
}

// Add N Number of Items to the Cart
export const addNItems = (id) => {
    return { type: ADD_N_NUMBER_OF_ITEMS, id }
}

// Add Shipping Cost for Prime Deliveries
export const addShippingCost = (cost) => {
    return { type: ADD_SHIPPING_FOR_PRIME, cost }
}

// Remove Shipping Cost for Non Prime Deliveries
export const removeShippingCost = (cost) => {
    return { type: REMOVE_SHIPPING_COST, cost }
}