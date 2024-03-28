import MainBtn from '@/components/buttons/MainBtn';
import css from './adminPage.module.scss';
import { useState } from 'react';
import AddTypeModal from '@/components/modals/addType/AddTypeModal';
import AddProductModal from '@/components/modals/addProduct/AddProductModal';

export default function AdminPage() {
  const [modalTypeIsOpen, setIsTypeOpen] = useState(false);
  const [modalProductIsOpen, setIsProductOpen] = useState(false);

  function openTypeModal() {
    setIsTypeOpen(true);
  }
  function closeTypeModal() {
    setIsTypeOpen(false);
  }

  function openProductModal() {
    setIsProductOpen(true);
  }
  function closeProductModal() {
    setIsProductOpen(false);
  }

  return (
    <section className={css.admin}>
      <div className="wrapper">
        <div className={css.adminContainer}>
          <h1 className={css.adminTitle}>Admin Panel</h1>
          <div className={css.adminContent}>
            <div className={css.adminBlock}>
              {/* @click="ModalTypeInstance.open" */}
              <MainBtn
                onClick={openTypeModal}
                version="contain"
              >
                Add type
              </MainBtn>
              <AddTypeModal
                modalIsOpen={modalTypeIsOpen}
                closeModal={closeTypeModal}
              />
            </div>
            <div className={css.adminBlock}>
              {/*  @click="ModalBrandInstance.open" */}
              <MainBtn
                disabled
                version="contain"
              >
                Add Brand
              </MainBtn>
            </div>
            <div className={css.adminBlock}>
              {/* @click="ModalProductInstance.open" */}
              <MainBtn
                onClick={openProductModal}
                version="contain"
              >
                Add Product
              </MainBtn>
              <AddProductModal
                modalIsOpen={modalProductIsOpen}
                closeModal={closeProductModal}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
