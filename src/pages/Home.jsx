import { HomeHero } from '../components/home/HomeHero'
import { FashionEdit } from '../components/home/FashionEdit'
import { CategoryShortcuts } from '../components/home/CategoryShortcuts'
import { DealsOfTheDay } from '../components/home/DealsOfTheDay'
import { TopPicks } from '../components/home/TopPicks'
import { FeaturedBrands } from '../components/home/FeaturedBrands'
import { Recommended, RecentlyViewed } from '../components/home/PersonalRails'
import { TrustBar } from '../components/home/TrustBar'

export default function Home() {
  return (
    <div className="container-page space-y-11 pt-4 sm:pt-6 lg:space-y-16">
      <HomeHero />
      <CategoryShortcuts />
      <FashionEdit />
      <DealsOfTheDay />
      <TopPicks />
      <FeaturedBrands />
      <Recommended />
      <RecentlyViewed />
      <TrustBar />
    </div>
  )
}
