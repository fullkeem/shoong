import { useState } from 'react';
import { timeSince } from '@/utils/timeSince';
import { GoTrash, GoPencil } from 'react-icons/go';

import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';

export default function ExchangeEdit({
  users,
  loginUser,
  loginStatus,
  exchangeListData,
  onEditExchange,
  onDeleteExchange,
}) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
  });

  const [editingState, setEditingState] = useState({
    isEditing: null,
    content: '',
  });

  const toggleModal = (message) => {
    setModalState((prev) => ({
      isOpen: !prev.isOpen,
      message: message || prev.message,
    }));
  };

  // 수정 시작
  const handleEdit = (exchangeData) => {
    setEditingState({
      isEditing: exchangeData.id,
      content: exchangeData.description,
    });
  };

  // 수정 저장
  const handleEditSubmit = async (exchangeId) => {
    try {
      await onEditExchange(exchangeId, editingState.content);
      toggleModal('교환 글이 수정되었습니다.');
      setEditingState({ isEditing: null, content: '' });
    } catch (error) {
      toggleModal(error.message);
    }
  };

  // 삭제
  const handleDelete = async (exchangeId) => {
    try {
      await onDeleteExchange(exchangeId);
      toggleModal('교환 글이 삭제되었습니다.');
    } catch (error) {
      toggleModal(error.message);
    }
  };

  const loggedInUserId = loginStatus ? loginUser?.user?.id : '';

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

        const timeSinceUpdated = timeSince(exchangeData.updated);
        const isUserTheWriter =
          exchangeData.writer === loggedInUserId ||
          loginUser?.user?.username === 'admin';

        return (
          <li
            key={exchangeData.id}
            className="overflow-hidden rounded-lg bg-white p-5 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-11 w-10">
                  <img
                    className="h-full w-full rounded-full border-2 object-cover"
                    src={`https://shoong.pockethost.io/api/files/users/${writer.id}/${writer.avatar}`}
                    alt="프로필 사진"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{writer.username}</p>
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
                  className="h-20 w-full rounded border p-2 text-gray-700"
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
                    onClick={() =>
                      setEditingState({ isEditing: null, content: '' })
                    }
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

      <ConfirmationModal
        isOpen={modalState.isOpen}
        showCancelButton={false}
        onConfirm={() => toggleModal()}
        message={modalState.message}
        confirmButtonText="확인"
      />
    </ul>
  );
}
