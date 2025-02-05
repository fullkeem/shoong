import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';

export default function ExchangeForm({ onAddExchange }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setComment('');
  };

  const handleConfirmModal = () => {
    if (modalMessage === '로그인이 필요한 서비스입니다.') {
      navigate('/login');
    }
    closeModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onAddExchange(comment);
      setComment(''); // 코멘트 초기화
      showModal('교환 글이 성공적으로 저장되었습니다.');
    } catch (error) {
      showModal(error.message);
      if (error.message.includes('로그인이 필요한')) {
        navigate('/login');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 mx-auto overflow-hidden bg-white rounded-xl shadow-meetUp"
    >
      <fieldset>
        <legend className="sr-only">교환글 작성 폼</legend>
        <div className="flex items-start w-full space-x-4">
          <div className="relative flex-1">
            <label htmlFor="ExchangeEdit" className="sr-only">
              교환 글을 입력하세요
            </label>
            <textarea
              id="ExchangeEdit"
              name="ExchangeEdit"
              className="relative w-full p-2 text-sm border border-gray-300 rounded h-60pxr"
              placeholder="코멘트를 입력하세요"
              rows={3}
              maxLength={150}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              aria-required="true"
            ></textarea>
            <span className="absolute text-xs text-gray-500 bottom-60pxr right-2">
              {comment.length}/150
            </span>
            <div className="flex items-center justify-end mt-2">
              <div className="flex items-center justify-end w-full space-x-2">
                <button
                  type="submit"
                  className="w-3/12 buttonStyle bg-secondary hover:bg-primary focus:bg-primary"
                >
                  저장
                </button>
                <button
                  type="button"
                  className="w-3/12 buttonStyle bg-contentTertiary hover:bg-contentSecondary focus:bg-contentSecondary"
                  onClick={handleCancel}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmModal}
        message={modalMessage}
        confirmButtonText="확인"
        showCancelButton={false}
      />
    </form>
  );
}
