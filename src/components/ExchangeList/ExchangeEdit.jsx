import { isLogin } from '@/store/store';
import useModalStore from '@/store/useModalStore';
import useUserListStore from '@/store/userListStore';

import ExchangeList from './ExchangeList';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';

export default function ExchangeEdit({
  loggedInUser,
  photoCardData,
  exchangeListData,
}) {
  const { users } = useUserListStore();
  const { init: loginStatus } = isLogin();
  const { isOpen, modalMessage, setIsOpen, setModalMessage } = useModalStore();

  const loggedInUserId = loginStatus ? loggedInUser?.user?.id : '';

  const toggleModal = (message) => {
    setIsOpen();
    if (message) setModalMessage(message);
  };

  return (
    <ul className="my-5 flex flex-col gap-4">
      {[...exchangeListData].reverse().map((exchangeData) => {
        const writer = users[exchangeData.writer];
        if (!writer) {
          return (
            <li key={exchangeData.id}>
              <p>로딩 중...</p>
            </li>
          );
        }
        return (
          <ExchangeList
            key={exchangeData.id}
            writer={writer}
            toggleModal={toggleModal}
            exchangeData={exchangeData}
            photoCardData={photoCardData}
            loggedInUser={loggedInUser}
            loggedInUserId={loggedInUserId}
          />
        );
      })}

      <ConfirmationModal
        title="안내"
        isOpen={isOpen}
        showCancelButton={false}
        onConfirm={() => toggleModal()}
        message={modalMessage}
        confirmButtonText="확인"
      />
    </ul>
  );
}
