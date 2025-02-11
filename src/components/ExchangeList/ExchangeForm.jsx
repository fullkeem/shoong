import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import containsProfanity from '@/libs/filter';
import { useAddExchangeMutation } from '@/hooks/useExchangeQuery';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import useModalStore from '@/store/useModalStore';

export default function ExchangeForm({ loggedInUser, photoCardData }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const addExchangeMutation = useAddExchangeMutation();
  const { isOpen, modalMessage, setIsOpen, setModalMessage } = useModalStore();

  const toggleModal = (message) => {
    setIsOpen();
    if (message) setModalMessage(message);
  };

  const handleConfirmModal = () => {
    if (modalMessage === '로그인이 필요한 서비스입니다.') {
      navigate('/login');
    }
    toggleModal();
  };

  const checkComment = (comment) => {
    if (!loggedInUser) {
      toggleModal('로그인이 필요한 서비스입니다.');
      return false;
    }

    if (containsProfanity(comment)) {
      toggleModal('비속어가 포함된 글은 작성할 수 없습니다.');
      return false;
    }

    if (!comment.trim()) {
      toggleModal('교환 글 내용을 입력해주세요.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkComment(comment)) {
      return;
    }

    addExchangeMutation.mutate(
      {
        photoCardId: photoCardData.id,
        userId: loggedInUser.user.id,
        data: {
          writer: loggedInUser.user.id,
          description: comment,
          status: '교환대기중',
          chatContent: null,
        },
      },
      {
        onSuccess: () => {
          setComment('');
          toggleModal('교환 글이 성공적으로 저장되었습니다.');
        },
      },
      {
        onError: (error) => {
          toggleModal(error?.message || '데이터를 저장하는 데 실패했습니다.');
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full overflow-hidden rounded-xl bg-white p-5 shadow-meetUp"
    >
      <fieldset>
        <legend className="sr-only">교환글 작성 폼</legend>
        <div className="flex w-full items-start space-x-4">
          <div className="relative flex-1">
            <label htmlFor="ExchangeEdit" className="sr-only">
              교환 글을 입력하세요
            </label>
            <textarea
              id="ExchangeEdit"
              name="ExchangeEdit"
              className="relative h-60pxr w-full rounded border border-gray-300 p-2 text-sm"
              placeholder="코멘트를 입력하세요"
              rows={3}
              maxLength={150}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              aria-required="true"
            ></textarea>
            <span className="absolute bottom-60pxr right-2 text-xs text-gray-500">
              {comment.length}/150
            </span>
            <div className="mt-2 flex items-center justify-end">
              <div className="flex w-full items-center justify-end space-x-2">
                <button
                  type="submit"
                  className="buttonStyle w-3/12 bg-secondary hover:bg-primary focus:bg-primary"
                >
                  저장
                </button>
                <button
                  type="button"
                  className="buttonStyle w-3/12 bg-contentTertiary hover:bg-contentSecondary focus:bg-contentSecondary"
                  onClick={() => setComment('')}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <ConfirmationModal
        title="안내"
        isOpen={isOpen}
        onClose={toggleModal}
        onConfirm={handleConfirmModal}
        message={modalMessage}
        confirmButtonText="확인"
        showCancelButton={false}
      />
    </form>
  );
}
