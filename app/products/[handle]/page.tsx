import { ProductPage } from '@/components/pages/products/ProductPage'

interface ProductPageProps {
  params: Promise<{ handle: string }>
}

export default async function Page({ params }: ProductPageProps) {
  const { handle } = await params
  return <ProductPage handle={handle} />
}
