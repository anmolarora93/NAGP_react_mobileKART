import { ADD_MOBILE_TO_CART, REMOVE_MOBILE_FROM_CART, ADD_SHIPPING_FOR_PRIME, ADD_N_NUMBER_OF_ITEMS, REMOVE_N_NUMBER_OF_ITEMS, SET_PRODUCT_LIST, REMOVE_SHIPPING_COST } from './Actions'

const initState = {
    products: [],
    addedItems: [],
    total: 0
}
const cartReducer = (state = initState, action) => {

    if(action.type == SET_PRODUCT_LIST) {
        return {
            ...state,
            products: action.products
        }
    }

    if (action.type === ADD_MOBILE_TO_CART) {
        let addedItem = state.products.find(product => product.productId === action.id)
        let existed_item = state.addedItems.find(product => product.productId === action.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + addedItem.productPrice
            }
        }
        else {
            addedItem.quantity = 1;
            let newTotal = state.total + addedItem.productPrice
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    }

    if (action.type === REMOVE_MOBILE_FROM_CART) {
        let itemToRemove = state.addedItems.find(product => product.productId === action.id)
        let new_items = state.addedItems.filter(product => product.productId !== action.id)
        let newTotal = state.total - (itemToRemove.productPrice * itemToRemove.quantity)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }

    if (action.type === ADD_N_NUMBER_OF_ITEMS) {
        let addedItem = state.products.find(product => product.productId === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.productPrice
        return {
            ...state,
            total: newTotal
        }
    }

    if (action.type === REMOVE_N_NUMBER_OF_ITEMS) {
        let addedItem = state.products.find(product => product.productId === action.id)
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(product => product.productId !== action.id)
            let newTotal = state.total - addedItem.productPrice
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.productPrice
            return {
                ...state,
                total: newTotal
            }
        }
    }

    if (action.type === ADD_SHIPPING_FOR_PRIME) {
        return {
            ...state,
            total: state.total + action.cost
        }
    }

    if (action.type === REMOVE_SHIPPING_COST) {
        return {
            ...state,
            total: state.total - action.cost
        }
    }

    else {
        return state
    }
}

export default cartReducer