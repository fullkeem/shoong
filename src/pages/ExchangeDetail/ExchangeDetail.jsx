import { useLoaderData } from 'react-router-dom';

import DetailHeader from '@/components/DetailHeader/DetailHeader';
import PhotoCardInfo from '@/components/ExchangeList/PhotoCardInfo';
import NumberOfExchangeList from '@/components/ExchangeList/NumberOfExchangeList';
import ExchangeForm from '@/components/ExchangeList/ExchangeForm';
import ExchangeEdit from '@/components/ExchangeList/ExchangeEdit';
import useExchangeDetail from '@/hooks/useExchangeDetail';

export default function ExchangeDetailDesktop() {
  const { photoCardData } = useLoaderData();

  const {
    users,
    loginUser,
    loginStatus,
    addExchange,
    editExchange,
    removeExchange,
    exchangeListData,
  } = useExchangeDetail(photoCardData);

  const text = `** 포토카드 이미지는 거래의 이해를 돕는 식별 목적으로 사용하고 있어요**
    
     ** 실제 포토카드와 이미지의 사이즈가 상이할 수 있으니 주의해주세요! **`;

  return (
    <div className="desktop:flex desktop:px-3">
      <div>
        <DetailHeader title="자세히" isBottomSheet text={text} />
        <PhotoCardInfo photoCardData={photoCardData} />
      </div>

      <div className="mx-auto mt-4 w-10/12 desktop:flex desktop:max-h-900pxr desktop:w-3/4 desktop:flex-col desktop:overflow-hidden">
        <NumberOfExchangeList exchangeListData={exchangeListData} />
        <ExchangeForm onAddExchange={addExchange} />
        <div className="desktop:mt-5 desktop:max-h-620pxr desktop:flex-1 desktop:overflow-y-auto">
          <ExchangeEdit
            users={users}
            loginUser={loginUser}
            loginStatus={loginStatus}
            onEditExchange={editExchange}
            onDeleteExchange={removeExchange}
            exchangeListData={exchangeListData}
          />
        </div>
      </div>
    </div>
  );
}
