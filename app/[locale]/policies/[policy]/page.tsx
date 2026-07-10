import { PolicyPage } from '@/components/pages/policies/PolicyPage';

interface PolicyPageProps {
  params: Promise<{ handle: string }>;
}

export default async function Page({ params }: PolicyPageProps) {
  const { handle } = await params;
  return <PolicyPage handle={handle} />;
}
