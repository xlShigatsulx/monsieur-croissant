import type { Metadata } from 'next';
import { PolicyPage } from '@/components/pages/policies/PolicyPage';
import { getShopPolicy } from '@/lib/shopify/server';

interface PolicyPageProps {
  params: Promise<{ locale: string; policy: string }>;
}

export async function generateMetadata({
  params,
}: PolicyPageProps): Promise<Metadata> {
  const { locale, policy } = await params;
  const policyData = await getShopPolicy(policy, locale);

  const title = policyData?.title || policy.replace(/-/g, ' ');

  return {
    title: `${title} | Monsieur Croissant`,
    description: `Офіційні положення та політика: ${title}`,
  };
}

export default async function Page({ params }: PolicyPageProps) {
  const { locale, policy } = await params;
  const policyData = await getShopPolicy(policy, locale);

  return (
    <PolicyPage
      policy={policy}
      title={policyData?.title}
      body={policyData?.body}
    />
  );
}
