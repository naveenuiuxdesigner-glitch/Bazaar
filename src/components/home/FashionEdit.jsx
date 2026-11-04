import { products } from '../../data/products'
import { ProductCard } from '../product/ProductCard'
import { SectionHeader } from '../ui/SectionHeader'

const fashionLooks = products.filter((product) => product.category === 'fashion' && product.photo?.generated)

export function FashionEdit() {
  return (
    <section aria-labelledby="fashion-edit-title">
      <SectionHeader id="fashion-edit-title" eyebrow="The everyday edit" title="Style that feels like you" subtitle="Easy layers, good fabrics and new favourites." to="/c/fashion" action="Shop all fashion" />
      <ul className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-9">
        {fashionLooks.map((product) => (
          <li key={product.id}><ProductCard product={product} showDelivery={false} /></li>
        ))}
      </ul>
    </section>
  )
}
