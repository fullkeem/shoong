import { useState } from 'react';
import { timeSince } from '@/utils/timeSince';
import containsProfanity from '@/libs/filter';
import { GoTrash, GoPencil } from 'react-icons/go';
import useUserListStore from '@/store/userListStore';
import useExchangeApi from '@/api/exchange/exchangeApi';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';

export default function ExchangeEdit({
  loginUser,
  loginStatus,
  exchangeListData,
  setExchangeListData,
}) {
  const { users } = useUserListStore((state) => ({
    users: state.users,
  }));

  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
  });

  const [editingState, setEditingState] = useState({
    isEditing: null,
    content: '',
  });
  const { deleteExchange, updateExchange } = useExchangeApi();

  const loggedInUserId = loginStatus ? loginUser?.user?.id : '';

  const toggleModal = (message) => {
    setModalState((prevState) => ({
      isOpen: !prevState.isOpen,
      message: message || prevState.message,
    }));
  };

  // 수정 시작
  const handleEdit = (exchangeData) => {
    setEditingState({
      isEditing: exchangeData.id,
      content: exchangeData.description,
    });
  };

  // 수정 취소
  const handleEditCancel = () => {
    setEditingState({ isEditing: null, content: '' });
  };

  // 수정 저장
  const handleEditSubmit = async (exchangeId) => {
    if (containsProfanity(editingState.content)) {
      toggleModal('비속어가 포함된 글은 작성할 수 없습니다');
      return;
    }

    try {
      const updatedRecord = await updateExchange(exchangeId, {
        description: editingState.content,
      });
      setExchangeListData((prevData) =>
        prevData.map((data) =>
          data.id === exchangeId
            ? { ...data, description: updatedRecord.description }
            : data
        )
      );
      handleEditCancel();
      toggleModal('교환 글이 수정되었습니다.');
    } catch (error) {
      toggleModal('교환 글 수정에 실패했습니다.');
    }
  };

  // 삭제
  const handleDelete = async (exchangeId) => {
    try {
      await deleteExchange(exchangeId);
      setExchangeListData((prevList) =>
        prevList.filter((exchange) => exchange.id !== exchangeId)
      );
      toggleModal('교환 글이 삭제되었습니다.');
    } catch (error) {
      toggleModal('교환 글 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      <ul className="mt-5">
        {[...exchangeListData].reverse().map((exchangeData) => {
          const user = users[exchangeData.writer];
          const timeSinceUpdated = timeSince(exchangeData.updated);
          const isUserTheWriter =
            exchangeData.writer === loggedInUserId ||
            loginUser?.user?.username === 'admin';

          if (!user) {
            return null;
          }

          return (
            <li
              key={exchangeData.id}
              className="mx-auto mb-3 overflow-hidden rounded-lg bg-white p-5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-11 w-10">
                    <img
                      className="h-full w-full rounded-full border-2 object-cover"
                      src={`https://shoong.pockethost.io/api/files/users/${user.id}/${user.avatar}`}
                      alt={`${user.username} 프로필 사진`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">{user.username}</p>
                    <time
                      dateTime={exchangeData.updated}
                      className="text-sm text-gray-500"
                    >
                      {timeSinceUpdated}
                    </time>
                  </div>
                </div>
                {isUserTheWriter && (
                  <div className="flex gap-1">
                    <GoPencil
                      className="mr-1 h-6 w-6 cursor-pointer text-primary"
                      onClick={() => handleEdit(exchangeData)}
                    />
                    <GoTrash
                      className="mr-1 h-6 w-6 cursor-pointer text-primary"
                      onClick={() => handleDelete(exchangeData.id)}
                    />
                  </div>
                )}
              </div>
              {editingState.isEditing === exchangeData.id ? (
                <div className="mt-3">
                  <textarea
                    className="w-full rounded border px-2 py-1 text-gray-700"
                    value={editingState.content}
                    onChange={(e) =>
                      setEditingState((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      className="w-3/12 rounded-lg bg-secondary py-3 text-white hover:bg-primary focus:bg-primary focus:outline-none"
                      onClick={() => handleEditSubmit(exchangeData.id)}
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      className="buttonStyle w-3/12 bg-contentTertiary hover:bg-contentSecondary focus:bg-contentSecondary "
                      onClick={handleEditCancel}
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <p className="text-gray-700">{exchangeData.description}</p>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <div className="rounded-3xl border border-gray-700 px-3 py-2 text-sm text-gray-700">
                  {exchangeData.status}
                </div>
                {!isUserTheWriter && (
                  <button
                    type="button"
                    className="buttonStyle w-4/12 bg-secondary hover:bg-primary focus:bg-primary"
                  >
                    대화하기
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <ConfirmationModal
        isOpen={modalState.isOpen}
        showCancelButton={false}
        onConfirm={() => toggleModal()}
        message={modalState.message}
        confirmButtonText="확인"
      />
    </>
  );
}
