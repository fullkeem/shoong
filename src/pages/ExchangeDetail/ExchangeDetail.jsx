import { useLoaderData } from 'react-router-dom';
import ExchangeList from '@/components/ExchangeList/ExchangeList';

export default function ExchangeDetail() {
  const { photoCardData } = useLoaderData();
  return (
    <div>
      <ExchangeList photoCardData={photoCardData} />
    </div>
  );
}
