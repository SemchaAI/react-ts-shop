import css from './mainFooter.module.scss';
export default function MainFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={css.footer}>
      <div className="wrapper">
        <div className={css.footerContainer}>
          <p className={css.footerText}>© {year}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
1;
