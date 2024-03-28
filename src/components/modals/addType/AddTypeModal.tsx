import MainBtn from '@/components/buttons/MainBtn';
import { MainInput } from '@/components/inputs/MainInput';
import Modal from 'react-modal';
import css from './addTypeModal.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormType } from '@/models/forms';
import { ReqMin5Max10Validation } from '@/app/utils/validationObjects';
import { useCreateTypeMutation } from '@/services/productApi';

export default function AddTypeModal({
  modalIsOpen,
  closeModal,
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm<IFormType>({
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
  });
  const [createType] = useCreateTypeMutation();

  const submitHandler: SubmitHandler<IFormType> = async (data) => {
    console.log('formData', data);
    if (data.name !== '') {
      try {
        await createType(data);
        closeModal();
      } catch (e) {
        //there will be error slice push. add will be toast message
        console.log('error', e);
      }
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="Example Modal"
      className="confirm-modal-content"
      overlayClassName="confirm-modal"
    >
      <h1 className={css.title}>Добавить тип</h1>
      <form
        className={css.form}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className={css.field}>
          <div>
            <label
              className={css.label}
              htmlFor="type"
            >
              Тип продукта:
            </label>
          </div>
          <MainInput
            {...register('name', ReqMin5Max10Validation)}
            error={errors.name}
            id="type"
          />
        </div>
        <div className={css.modalControls}>
          <MainBtn
            disabled={!isValid}
            type="submit"
          >
            {isLoading ? 'Отправляется...' : 'Отправить'}
          </MainBtn>
          <MainBtn onClick={closeModal}>Закрыть</MainBtn>
        </div>
      </form>
    </Modal>
  );
}
