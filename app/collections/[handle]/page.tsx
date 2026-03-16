import { CollectionPage } from '@/components/pages/collections/CollectionPage'

interface CollectionPageProps {
  params: Promise<{ handle: string }>
}

export default async function Page({ params }: CollectionPageProps) {
  const { handle } = await params
  return <CollectionPage handle={handle} />
}
