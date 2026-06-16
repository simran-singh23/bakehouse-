import ProductCard from '../components/ProductCard'
import { products } from '../data/bakeryData'

function Menu() {
  return (
    <section className="section-wrap">
      <div className="section-title">

        <p>Menu</p>
        <h2>Pick something happy</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((item) => (

          <ProductCard item={item} key={item.name} />
        ))}
      </div>
      <div className="mt-10 rounded-lg bg-stone-950 p-6 text-white">
        <h3 className="text-2xl font-bold">Custom cake orders</h3>
        <p className="mt-3 max-w-3xl leading-7 text-stone-200">
          
          Share flavour, weight, theme and pickup date. We make birthday, anniversary and small
          celebration cakes with fresh cream or fondant finishing.
        </p>
      </div>
    </section>
  )
}

export default Menu
