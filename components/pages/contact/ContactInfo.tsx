import { SocialIcons } from '@/components/ui/SocialIcons'
import { ContactData, useContactData } from '@/hooks/useContactData'
import { ContactInfoSkeleton } from './ContactInfoSkeleton'
import { ContactMap } from './ContactMap'
import { useTranslations } from 'next-intl'

export function ContactInfo() {
  const { data, loading } = useContactData()

  if (loading) return <ContactInfoSkeleton />
  if (!data) return null

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <AddressBlock address={data.address} />
      <PhoneBlock phone={data.phone} />

      <ContactInfoDivider />

      <HoursBlock
        hoursWeekdays={data.hoursWeekdays}
        hoursWeekends={data.hoursWeekends}
      />
      <SocialsBlock />

      <ContactMap mapsUrl={data.mapsUrl} />
    </div>
  )
}

function InfoBlock({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className='font-cormorant italic text-caramel text-lg mb-1'>{label}</p>
      {children}
    </div>
  )
}

function ContactInfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-white/60 backdrop-blur-sm border border-caramel/15 rounded-2xl px-6 py-6 flex flex-col gap-4'>
      {children}
    </div>
  )
}

function ContactInfoDivider() {
  return <div className='sm:col-span-2 h-px bg-caramel/15' />
}

function AddressBlock({ address }: { address: string }) {
  const t = useTranslations('contact.info')
  return (
    <ContactInfoCard>
      <InfoBlock label={t('address')}>
        <p className='text-mocha text-sm leading-relaxed whitespace-pre-line'>
          {address}
        </p>
      </InfoBlock>
    </ContactInfoCard>
  )
}

export function HoursBlock({
  hoursWeekdays,
  hoursWeekends,
}: Pick<ContactData, 'hoursWeekdays' | 'hoursWeekends'>) {
  const t = useTranslations('contact.info')
  return (
    <ContactInfoCard>
      <InfoBlock label={t('hours')}>
        <div className='text-mocha text-sm leading-relaxed space-y-0.5'>
          <p>{hoursWeekdays}</p>
          <p>{hoursWeekends}</p>
        </div>
      </InfoBlock>
    </ContactInfoCard>
  )
}

export function PhoneBlock({ phone }: { phone: string }) {
  const t = useTranslations('contact.info')
  return (
    <ContactInfoCard>
      <InfoBlock label={t('phone')}>
        <a
          href={`tel:${phone}`}
          className='text-mocha text-sm hover:text-caramel transition-colors duration-200'
        >
          {phone}
        </a>
      </InfoBlock>
    </ContactInfoCard>
  )
}

export function SocialsBlock() {
  const t = useTranslations('contact.info')
  return (
    <ContactInfoCard>
      <InfoBlock label={t('socials')}>
        <SocialIcons />
      </InfoBlock>
    </ContactInfoCard>
  )
}
