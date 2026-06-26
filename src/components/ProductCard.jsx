function ProductCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#d4c3be]/50 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/5] overflow-hidden bg-[#f0eee6]">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl font-black text-[#442a22]">{item.name}</h3>
          <span className="shrink-0 rounded-full bg-[#ffd9e4] px-3 py-1 text-xs font-black text-[#65394b]">
            {item.price}
          </span>
        </div>
        <p className="mt-3 leading-7 text-[#504441]">{item.desc}</p>
      </div>
    </article>
  )
}

export default ProductCard
