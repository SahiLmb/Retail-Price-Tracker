import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const Home = async () => {
  const allProducts = await getAllProducts();



  return (
    <>
    <section className="px-6 md:px-2 ">
      <div className="flex max-xl:flex-col gap-16">
        <div className="flex flex-col justify-center">
          <p className="flex gap-2 text-s font-medium text-gray-600">
            Shop Smart, Shop Right!
            <Image
              src="/assets/icons/check.svg"
              alt="arrow-right"
              width={16}
              height={16}
            />
          </p>

          <h1 className="head-text">
          Elevate Your Strategy with 
            <span className="crawler-text">CrawlerMart</span>
            
          </h1>

          <p className="mt-4 text-xl">
          Unlock exclusive savings with personalized email alerts for every price drop!
          </p>

          <Searchbar />
        </div>

        <HeroCarousel/>
      </div>
    </section>

    <section className="trending-section">
      <h2 className="section-text">Recently Searched Products</h2>

      <div className="flex flex-wrap gap-x-8 gap-y-16">
        {allProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
    </>

    
  )
}



export default Home