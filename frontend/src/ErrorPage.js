import React from 'react';
import { useTranslation } from 'react-i18next';
import errorPage from './image/errorPage.svg';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="h-100">
      <div className="h-100">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                {t('text.hexletHeader')}
              </a>
            </div>
          </nav>
          <div className="text-center">
            <img
              alt="Страница не найдена"
              className="img-fluid h-25"
              src={errorPage}
            />
            <h1 className="h4 text-muted">{t('text.pageNotFound')}</h1>
            <p className="text-muted">
              {t('text.dontEnter')}
              <a href="/">{t('text.goToMainPage')}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
