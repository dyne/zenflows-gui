import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation, Trans } from 'next-i18next'



const CreationComplete = () => {
    const { t } = useTranslation('common')
    return (
        <>
        <div>
            <h1>{t('All set!')}</h1>
            <Link href={'/'}><a className={'btn btn-primary'}>{t('Go to home')}</a></Link><br/>
            <Link href={'/projects'}><a className={'btn btn-primary my-2'}>{t('Go to projects')}</a></Link><br/>
            <Link href={'/inventory'}><a className={'btn btn-primary'}>{t('Go to inventory')}</a></Link><br/>
        </div>
            </>
    );
}

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default CreationComplete;