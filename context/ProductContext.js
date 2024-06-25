import React, { createContext, useState, useEffect } from 'react'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [favs, setFavs] = useState([])
  const [shopKart, setShopKart] = useState([]) 
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  
  const loadProducts = async () => {
    try {
      const res = await fetch('https://665683ed9f970b3b36c5aab8.mockapi.io/api/v1/sneakersFP')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error cargando productos:', error)
    }
  }

  const serchProducts = () => {
    if (searchQuery) {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.marca.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filteredProducts)
    } else {
      setSearchResults([])
    }
  }

  useEffect(() => {
    loadProducts()
  }, []);

  useEffect(() => {
    serchProducts()
  }, [searchQuery, products])
  
  const updateFav = async (sneakerId, suma) => {
    const apiUrl = 'https://665683ed9f970b3b36c5aab8.mockapi.io/api/v1/sneakersFP'
    let bodyData;
  
    try {
      const response = await fetch(`${apiUrl}/${sneakerId}`)
      if (!response.ok) {
        throw new Error('Error al obtener el sneaker')
      }
      const sneaker = await response.json()
      const currentFavsCount = sneaker.favsCount
  
      bodyData = suma
        ? { favsCount: currentFavsCount + 1 }
        : { favsCount: currentFavsCount - 1 }
  
      const putResponse = await fetch(`${apiUrl}/${sneakerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      })
  
      if (!putResponse.ok) {
        throw new Error('Error al actualizar el valor')
      }
    } catch (error) {
      console.error('Hubo un problema al actualizar:', error)
    }
  }
  

  const addFav = (sneaker) => {
    setFavs((prevFav) => [...prevFav, sneaker])
    updateFav(sneaker.id, true)
  }

  const removeFav = (sneakerId) => {
    setFavs((prevFav) => prevFav.filter((item) => item.id !== sneakerId))
    updateFav(sneakerId, false)
  }

  const isFav = (sneakerId) => {
    return favs.some((item) => item.id === sneakerId)
  }

  const getTopFavs = () => {
    const sortedProducts = [...products].sort((a, b) => b.favsCount - a.favsCount)
    return sortedProducts.slice(0, 2)
  }

  const getMostRecent = () => {
    const sortedProducts = [...products].sort((a, b) => new Date(b.date) - new Date(a.date))
    return sortedProducts.slice(0, 2)
  }

  const getMostExpensive = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price)
    return sortedProducts.slice(0, 2)
  }

  const addShopKart = (sneaker) => {
    setShopKart((prevShopKart) => [...prevShopKart, sneaker])
  }

  const removeShopKart = (sneakerId) => {
    setShopKart((prevShopKart) => prevShopKart.filter((item) => item.id !== sneakerId))
  }

  const isInShopKart = (sneakerId) => {
    return shopKart.some((item) => item.id === sneakerId)
  }

  return (
    <ProductContext.Provider value={{ 
      products,
      favs,
      shopKart,
      addFav,
      isFav,
      removeFav, 
      getTopFavs,
      getMostRecent,
      getMostExpensive,
      addShopKart,
      removeShopKart,
      isInShopKart,
      loadProducts,
      searchQuery,
      setSearchQuery,
      searchResults
      }}>
      {children}
    </ProductContext.Provider>
  )
};