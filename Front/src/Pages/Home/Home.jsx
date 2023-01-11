import React from 'react'
import Hero from '../../Components/Hero/Hero'
import LatestProducts from '../../Components/LatestProducts/LatestProducts'
import Footer from '../../Components/Footer/Footer';
import { useSelector } from 'react-redux'
import Carrousel from '../../Components/Carrousel/Carrousel'

const Home = () => {
  const brands = useSelector((s) => s.brands)

  return (
    <>
      <Hero />
      <Carrousel brands={brands} />
      <LatestProducts />
      <Footer />
    </>
  )
}

export default Home
