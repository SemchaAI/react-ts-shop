import MainBtn from '@/components/buttons/MainBtn';
import { MainInput } from '@/components/inputs/MainInput';
import { IFormProduct } from '@/models/forms';
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  Controller,
} from 'react-hook-form';
import Modal from 'react-modal';

import css from './addProductModal.module.scss';
import {
  Min5,
  ReqMin5Max10Validation,
  required,
} from '@/app/utils/validationObjects';
import Select from 'react-select';
import {
  useCreateProductMutation,
  useGetTypesQuery,
} from '@/services/productApi';
import { ChangeEvent } from 'react';
import { TProductDTO } from '@/models/products';

export default function AddProductModal({
  modalIsOpen,
  closeModal,
}: {
  modalIsOpen: boolean;
  closeModal: () => void;
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm<IFormProduct>({
    defaultValues: {
      cnt: 999,
      description: '333333',
      title: 'testTitle',
      price: 22222,
      // typeId: {
      //   value: '',
      //   label: 'тип продукта',
      // },
      info: [
        {
          title: '',
          description: '',
        },
      ],
    },
    mode: 'onBlur',
  });

  const {
    fields: thumbnails,
    append: appendThumbnails,
    update: updateThumbnails,
    remove: removeThumbnails,
  } = useFieldArray({
    control,
    name: 'thumbnails',
  });

  const {
    fields: info,
    append: appendInfo,
    remove: removeInfo,
  } = useFieldArray({
    control,
    name: 'info',
  });

  const selectFileThumbnail = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.target as HTMLInputElement;
    console.log(thumbnails);
    console.log(index);
    console.log(e.target);
    if (target.files !== null) {
      // thumbnails[index].thumbnail = target.files[0];
      updateThumbnails(index, { thumbnail: target.files[0] });
    }
  };

  const { data: types } = useGetTypesQuery(null);

  const options = types
    ? types.map((type) => ({
        value: type._id,
        label: type.name,
      }))
    : [];
  console.log('options', options);

  const [createProduct] = useCreateProductMutation();
  const onSubmit: SubmitHandler<IFormProduct> = async (data) => {
    console.log('data', data);

    const formData: FormData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', String(data.price));
    formData.append('cnt', String(data.cnt));
    formData.append('img', data.img[0]);
    //
    thumbnails.map((el, index) => {
      if (el.thumbnail instanceof File) {
        formData.append(`thumbnail${index}`, el.thumbnail);
      }
    });
    //

    formData.append('info', JSON.stringify(data.info));
    formData.append('typeId', data.typeId.value);

    createProduct(formData);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="add product"
      className="confirm-modal-content"
      overlayClassName="confirm-modal"
    >
      <h1>Добавить продукт</h1>
      <form
        className={css.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label>Выберите Тип:</label>
          <Controller
            name="typeId"
            control={control}
            rules={required}
            render={({ field, fieldState: { error } }) => (
              <>
                <Select
                  {...field}
                  options={options}
                  placeholder="Выберите тип"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,
                      neutral0: '#3d3d3d',
                      primary25: '#292929',
                      neutral90: 'white',
                      neutral80: 'white',
                      primary: '#bb86fc',
                    },
                  })}
                />
                <div className={css.error}>{error?.message}</div>
              </>
            )}
          />
        </div>
        <div className={css.field}>
          <div>
            <label htmlFor="title">Название продукта:</label>
          </div>
          <MainInput
            {...register('title', ReqMin5Max10Validation)}
            error={errors.title}
            placeholder="Название"
            id="title"
          />
        </div>
        <div className={css.field}>
          <div>
            <label htmlFor="price">Цена продукта:</label>
          </div>
          <MainInput
            {...register('price', required)}
            error={errors.price}
            type="number"
            placeholder="Введите цену"
            id="price"
          />
        </div>
        <div className={css.field}>
          <div>
            <label htmlFor="cnt">Задай кол-во на складе:</label>
          </div>
          <MainInput
            // v-model="cnt"
            // v-bind="cntAttrs"
            // :error="errors.cnt"
            {...register('cnt', required)}
            error={errors.cnt}
            type="number"
            placeholder="кол-во 1,2,3"
            id="cnt"
          />
        </div>
        <div className={css.field}>
          <div>
            <label htmlFor="description">Краткое описание:</label>
          </div>
          <MainInput
            {...register('description', Min5)}
            error={errors.description}
            placeholder="описание"
            id="description"
          />
        </div>
        <div className={css.field}>
          <div>
            <label
              className={css.fakeBtn}
              htmlFor="img"
            >
              Главное изображение:
            </label>
          </div>
          <MainInput
            {...register('img', required)}
            error={errors.img}
            type="file"
            myType="file"
            id="img"
          />
        </div>
        <div className={css.infoContainer}>
          <MainBtn
            version="contain"
            onClick={() => appendThumbnails({ thumbnail: '' })}
          >
            Добавить новое изображение
          </MainBtn>
          {thumbnails.length > 0 && (
            <div className={css.fieldsContainer}>
              {thumbnails.map((thumbnail, index) => (
                <div
                  key={thumbnail.id}
                  className={css.row}
                >
                  <div>
                    <label
                      className={css.fakeBtn}
                      htmlFor={thumbnail.id + 'img'}
                    >
                      Доп Изображение
                    </label>
                  </div>
                  <MainInput
                    onChange={(e) => selectFileThumbnail(e, index)}
                    type="file"
                    myType="file"
                    id={thumbnail.id + 'img'}
                  />
                  <MainBtn
                    version="contain"
                    onClick={() => removeThumbnails(index)}
                  >
                    Удалить
                  </MainBtn>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={css.infoContainer}>
          <MainBtn
            version="contain"
            onClick={() =>
              appendInfo({
                title: '',
                description: '',
              })
            }
          >
            Добавить новое свойство
          </MainBtn>
          {info.length > 0 && (
            <div
              // v-auto-animate
              className={css.fieldsContainer}
            >
              {info.map((field, index) => (
                <div
                  key={field.id}
                  className={css.row}
                >
                  <MainInput
                    {...register(`info.${index}.title`)}
                    error="never"
                    placeholder="название свойства"
                  />
                  <MainInput
                    {...register(`info.${index}.description`)}
                    error="never"
                    placeholder="описание свойства"
                  />
                  <MainBtn
                    version="contain"
                    onClick={() => removeInfo(index)}
                  >
                    Удалить
                  </MainBtn>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={css.row}>
          <MainBtn
            disabled={isValid}
            version="contain"
            type="submit"
          >
            Добавить {isValid ? 'valid' : 'invalid'}
          </MainBtn>
          <MainBtn onClick={closeModal}>Закрыть</MainBtn>
        </div>
      </form>
    </Modal>
  );
}
