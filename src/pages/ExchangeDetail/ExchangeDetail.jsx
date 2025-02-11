import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import useUserListStore from '@/store/userListStore';
import { useExchangeQuery } from '@/hooks/useExchangeQuery';

import ExchangeForm from '@/components/ExchangeList/ExchangeForm';
import ExchangeEdit from '@/components/ExchangeList/ExchangeEdit';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import PhotoCardInfo from '@/components/ExchangeList/PhotoCardInfo';
import NumberOfExchangeList from '@/components/ExchangeList/NumberOfExchangeList';

export default function ExchangeDetail() {
  const { id } = useParams();
  const { fetchUsers } = useUserListStore();
  const { data, isLoading, isError } = useExchangeQuery(id);
  const photoCardData = data;

  const exchangeListData = useMemo(
    () => photoCardData?.expand?.exchangeList || [],
    [photoCardData]
  );

  useEffect(() => {
    const writerIds = exchangeListData
      .map((data) => data?.writer)
      .filter(Boolean);
    if (writerIds.length > 0) {
      fetchUsers(writerIds);
    }
  }, [exchangeListData, fetchUsers]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  if (!data) return null; // 혹은 return <div>데이터 없음</div>;

  // 로그인 여부, 로그인 유저 정보
  const userInfo = localStorage.getItem('auth');
  const loggedInUser = userInfo ? JSON.parse(userInfo) : null;

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
        <ExchangeForm
          loggedInUser={loggedInUser}
          photoCardData={photoCardData}
        />
        <div className="desktop:mt-5 desktop:max-h-620pxr desktop:flex-1 desktop:overflow-y-auto">
          <ExchangeEdit
            loggedInUser={loggedInUser}
            photoCardData={photoCardData}
            exchangeListData={exchangeListData}
          />
        </div>
      </div>
    </div>
  );
}
