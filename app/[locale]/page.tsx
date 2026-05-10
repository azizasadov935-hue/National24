import { getTranslations } from 'next-intl/server'
import { fetchAPI } from '@/lib/api'
import Hero from '@/components/Hero'
import TrendingPosts from '@/components/TrendingPosts'
import CategorySection from '@/components/CategorySection'
import { Suspense } from 'react'

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations()

  // Strapi'dan ma'lumotlarni olish
  let posts: any[] = []
  let trending: any[] = []
  let militaryPosts: any[] = []
  let historyPosts: any[] = []
  let factsPosts: any[] = []

  try {
    const postsData = await fetchAPI('/api/articles', {
      populate: ['image', 'category', 'author'],
      sort: ['publishedAt:desc'],
      pagination: { pageSize: 10 },
      locale: locale,
    })
    posts = postsData.data || []

    const trendingData = await fetchAPI('/api/articles', {
      filters: { isTrending: true },
      populate: ['image'],
      pagination: { pageSize: 5 },
      locale: locale,
    })
    trending = trendingData.data || []

    const militaryData = await fetchAPI('/api/articles', {
      filters: { category: { slug: 'military' } },
      populate: ['image'],
      pagination: { pageSize: 4 },
      locale: locale,
    })
    militaryPosts = militaryData.data || []

    const historyData = await fetchAPI('/api/articles', {
      filters: { category: { slug: 'history' } },
      populate: ['image'],
      pagination: { pageSize: 4 },
      locale: locale,
    })
    historyPosts = historyData.data || []

    const factsData = await fetchAPI('/api/articles', {
      filters: { category: { slug: 'facts' } },
      populate: ['image'],
      pagination: { pageSize: 4 },
      locale: locale,
    })
    factsPosts = factsData.data || []
  } catch (error) {
    console.error('Failed to fetch:', error)
  }

  return (
    <div className="space-y-12">
      <Hero posts={posts.slice(0, 3)} />
      <Suspense fallback={<div>Loading trending...</div>}>
        <TrendingPosts posts={trending} />
      </Suspense>
      <CategorySection title={t('Military')} posts={militaryPosts} />
      <CategorySection title={t('History')} posts={historyPosts} />
      <CategorySection title={t('Facts')} posts={factsPosts} />
    </div>
  )
}
