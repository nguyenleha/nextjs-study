'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('component.localeSwitcher');

  const handleValueChange = (value: string) => {
    router.push(`/${value}${pathname}`);
    router.refresh(); // Ensure the page takes the new locale into account related to the issue #395
  };

  return (
    <Select
      defaultValue={locale}
      onValueChange={handleValueChange}
      aria-label="lang-switcher">
      <SelectTrigger>
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map(elt => (
          <SelectItem key={elt} value={elt}>
            {t(`languages.${elt}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
