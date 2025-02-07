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

  const handleConfirmModal = () => {
    if (modalMessage === '로그인이 필요한 서비스입니다.') {
      navigate('/login');
    }
    closeModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('test1');
    try {
      await onAddExchange(comment);
      setComment('');
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
