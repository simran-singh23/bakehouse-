import Hero from '../components/Hero'
import PhotoAttached from '../components/PhotoAttached'

import ProductCard from '../components/ProductCard'
import { products, specials } from '../data/bakeryData'

function Home() {
  return (
    <>
      <Hero />
      <section className="section-wrap">
        <div className="section-title">
          <p>Our favourites</p>
 <h2>Fresh from the counter</h2>
        </div>
       
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((item) => (
            <ProductCard item={item} key={item.name} />

          ))}
   </div>

      </section>
      <PhotoAttached />

      <section className="section-wrap grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="tag">Why people order again</p>
     <h2 className="mt-3 text-4xl font-black text-stone-950">Small-batch baking, simple good taste.</h2>
          <p className="mt-4 leading-8 text-stone-600">   

    We keep the menu practical and delicious: celebration cakes, quick desserts and warm
            snacks for family evenings.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {specials.map((item) => (
        
        <span  key={item}
              className="rounded-lg border border-rose-100 bg-rose-50 px-4 py-4 font-semibold text-stone-800"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
