import useExchangeDetail from '@/hooks/useExchangeDetail';

import ExchangeForm from './_components/ExchangeForm';
import ExchangeEdit from './_components/ExchangeEdit';
import DetailHeader from '../DetailHeader/DetailHeader';
import PhotoCardInfo from './_components/PhotoCardInfo';
import NumberOfExchangeList from './_components/NumberOfExchangeList';

export default function ExchangeList({ photoCardData }) {
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
    <>
      <DetailHeader title="자세히" isBottomSheet text={text} />
      <PhotoCardInfo photoCardData={photoCardData} />
      <NumberOfExchangeList exchangeListData={exchangeListData} />

      <div className="w-10/12 mx-auto mt-4">
        <ExchangeForm onAddExchange={addExchange} />

        <ExchangeEdit
          users={users}
          loginUser={loginUser}
          loginStatus={loginStatus}
          onEditExchange={editExchange}
          onDeleteExchange={removeExchange}
          exchangeListData={exchangeListData}
        />
      </div>
    </>
  );
}
